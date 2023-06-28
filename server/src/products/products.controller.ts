import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductDTO } from "./dto";

@Controller("products")
export class ProductsController {
  constructor(private readonly exampleService: ProductsService) {}
  @Post("create")
  createProduct(@Body() body: ProductDTO) {
    // TODO: create product
    return this.exampleService.test();
  }
  @Get("all")
  getAllProducts() {
    // TODO: get all products
    return this.exampleService.test2();
  }
  @Get("specific/:id")
  getSpecificProduct() {
    // TODO: get specific product
  }
}
