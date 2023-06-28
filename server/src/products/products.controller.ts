import { Body, Controller, Get } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("examples")
export class ProductsController {
  constructor(private readonly exampleService: ProductsService) {}
  @Get("test")
  test(@Body() body: any) {
    console.log(body);
    return this.exampleService.test();
  }
  @Get()
  test2() {
    return this.exampleService.test2();
  }
}
