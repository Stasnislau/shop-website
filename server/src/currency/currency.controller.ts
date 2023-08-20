import { Controller, Get } from "@nestjs/common";
import { CurrencyService } from "./currency.service";

@Controller("currency")
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}
  @Get("all")
  async getAllCurrencies() {
    return await this.currencyService.getAllCurrencies();
  }
}
