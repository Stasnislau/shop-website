import { Body, Controller, Get, Post, Delete, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductDTO } from "./dto";
@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Post("create")
  createProduct(@Body() body: ProductDTO) {
    this.productService.createProduct(body);
  }
  @Get("all")
  getAllProducts() {
    this.productService.getAllProducts();
  }
  @Get("specific/:id")
  getSpecificProduct(@Param("id") id: string) {
    this.productService.getSpecificProduct(id);
  }

  @Get("category")
  getByCategory(
    @Body()
    category: "men" | "women" | "kids"
  ) {
    this.productService.getByCategory(category);
  }

  @Delete("delete/:id")
  deleteProduct(@Param("id") id: string) {
    this.productService.deleteProduct(id);
  }
}
