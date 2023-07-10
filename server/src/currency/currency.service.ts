import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

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
            return currencies;
        } catch (error) {
            console.log(error);
        }
    }
}
