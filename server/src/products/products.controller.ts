import { Body, Controller, Get, Post, Delete, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductDTO } from "./dto";
@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Post("create")
  createProduct(@Body() body: ProductDTO) {
    return this.productService.createProduct(body);
  }
  @Get("all")
  getAllProducts() {
    return this.productService.getAllProducts();
  }
  @Get("specific/:id")
  getSpecificProduct(@Param("id") id: string) {
    return this.productService.getSpecificProduct(id);
  }

  @Get("category/:category")
  getByCategory(@Param("category") category: "men" | "women" | "kids") {
    return this.productService.getByCategory(category);
  }

  @Delete("delete/:id")
  deleteProduct(@Param("id") id: string) {
    return this.productService.deleteProduct(id);
  }
}
