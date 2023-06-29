import { Body, Controller, Get, Post, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductDTO } from "./dto";

@Controller("products")
export class ProductsController {
  constructor(private readonly exampleService: ProductsService) {}
  @Post("create")
  createProduct(@Body() body: ProductDTO) {
    this.createProduct(body);
  }
  @Get("all")
  getAllProducts() {
    this.getAllProducts();
  }
  @Get("specific/:id")
  getSpecificProduct() {
    // TODO: get specific product
  }

  @Get("category")
  getByCategory(
    @Body()
    category: "men" | "women" | "children"
  ) {}

  @Delete("delete/:id")
  deleteProduct() {}
}
