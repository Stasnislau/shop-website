import { Controller, Get, UseFilters } from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import { HttpExceptionFilter } from "src/http-exception.filter";
import ApiError from "src/exceptions/api-error";

@Controller("currency")
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}
  @UseFilters(new HttpExceptionFilter())
  @Get("all")
  async getAllCurrencies() {
    const currencies = await this.currencyService.getAllCurrencies();
    if (currencies instanceof ApiError) {
      throw currencies;
    }
    return currencies;
  }
}
