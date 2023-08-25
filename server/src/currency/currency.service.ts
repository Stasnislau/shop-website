import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import ApiError from "src/exceptions/api-error";
import { Next } from "@nestjs/common";

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}
  async getAllCurrencies() {
    try {
      const currencies = await this.prisma.currencies.findMany({
        select: {
          currency: true,
          currencyCode: true,
        },
      });
      if (!currencies || currencies.length === 0) {
        return ApiError.notFound("No currencies found");
      }
      return currencies;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
