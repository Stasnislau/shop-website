import { Injectable } from "@nestjs/common";
import { Price, ProductDTO } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
@Injectable({})
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async createProduct(body: ProductDTO) {
    const prices = await this.calculatePrice(body.prices[0]);
    if (prices.length === 0) {
      throw new Error("Something went wrong");
    }
    const product = await this.prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        prices: { create: [...prices] },
        gallery: [...body.gallery],
        sizes: [...body.sizes],
        colors: [...body.colors],
        category: body.category,
      },
    });
    if (!product) {
      throw new Error("Something went wrong");
    }
    return "Product created successfully";
  }
  async getAllProducts() {
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
  }
  private async calculatePrice(price: Price) {
    const newPrices = [] as Price[];
    try {
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
            amount:
              (price.amount / currentCurrency.exchangeRate) * item.exchangeRate,
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
