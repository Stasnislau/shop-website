import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import ApiError from "../exceptions/api-error";

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}
  async getAllCurrencies() {
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
  }
}
