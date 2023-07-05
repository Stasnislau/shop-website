import { Injectable } from "@nestjs/common";
import { Price, ProductDTO } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
@Injectable({})
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async createProduct(body: ProductDTO) {
    try {
      const prices = (await this.calculatePrice(body.prices[0])) as Price[];
      if (prices.length === 0) {
        throw new Error("Something went wrong");
      }
      console.log(prices);
      const product = await this.prisma.product.create({
        data: {
          name: body.name,
          description: body.description,
          prices: {
            create: prices
          },
          gallery: [...body.gallery],
          sizes: [...body.sizes],
          colors: [...body.colors],
          category: body.category,
        },
      });
      if (!product) {
        throw new Error("Something went wrong");
      }
      return product;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllProducts() {
    try {
      const products = await this.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          prices: true,
          gallery: true,
          sizes: true,
          colors: true,
          category: true,
        },
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
  async getSpecificProduct(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          name: true,
          description: true,
          prices: true,
          gallery: true,
          sizes: true,
          colors: true,
          category: true,
        },
      });
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  getByCategory(category: "men" | "women" | "kids") {
    try {
      const products = this.prisma.product.findMany({
        where: { category },
        select: {
          id: true,
          name: true,
          description: true,
          prices: true,
          gallery: true,
          sizes: true,
          colors: true,
          category: true,
        },
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id: string) {
    try {
      const product = await this.prisma.product.delete({
        where: { id: Number(id) },
      });
      return "Product deleted"
    } catch (error) {
      console.log(error);
    }
  }

  private async calculatePrice(price: Price) {
    try {
      const newPrices = [] as Price[];
      const currencies = await this.prisma.currencies.findMany();

      const currentCurrency = currencies.find(
        (currency) => currency.currency === price.currency
      );
      currencies.forEach((item) => {
        if (item.currency === price.currency) {
          newPrices.push(price);
        }
        if (item.currency !== price.currency) {
          const newPrice = {
            currency: item.currency,
            amount: Number(
              (
                (price.amount * currentCurrency.exchangeRate) /
                item.exchangeRate
              ).toFixed(2)
            ),
          };
          newPrices.push(newPrice);
        }
      });
      return newPrices;
    } catch (error) {
      console.log(error);
    }
  }
}
