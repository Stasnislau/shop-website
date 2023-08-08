import { Body, Controller, Get, Post, Delete, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductDTO } from "./dto";
@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Post("create")
  async createProduct(@Body() body: ProductDTO) {
    return await this.productService.createProduct(body);
  }
  @Get("all")
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }
  @Get("specific/:id")
  async getSpecificProduct(@Param("id") id: string) {
    return await this.productService.getSpecificProduct(id);
  }

  @Get("category/:category")
  async getByCategory(@Param("category") category: "men" | "women" | "kids") {
    return await this.productService.getByCategory(category);
  }

  @Delete("delete/:id")
  async deleteProduct(@Param("id") id: string) {
    return await this.productService.deleteProduct(id);
  }
}
