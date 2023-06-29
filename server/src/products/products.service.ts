import { Injectable } from "@nestjs/common";
import { ProductDTO } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
@Injectable({})
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async createProduct(body: ProductDTO) {
    const product = await this.prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        prices: {
          create: body.prices,
        },
        gallery: [...body.gallery],
        sizes: [...body.sizes],
        colors: [...body.colors],
        category: body.category,
      },
    });
  }
  private async calculatePrice(price: { currency: string; amount: number }) {
    const newPrices = [];
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
      return price;
    } catch (error) {
      console.log(error);
    }
  }
}
