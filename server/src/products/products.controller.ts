import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseFilters,
} from "@nestjs/common";
import { HttpExceptionFilter } from "../http-exception.filter";
import ApiError from "../exceptions/api-error";
import { ProductsService } from "./products.service";
import { ProductDTO } from "./dto";
@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @UseFilters(new HttpExceptionFilter())
  @Post("create")
  async createProduct(@Body() body: ProductDTO) {
    const product = await this.productService.createProduct(body);
    if (product instanceof ApiError) {
      throw product;
    }
    return product;
  }
  @UseFilters(new HttpExceptionFilter())
  @Get("all")
  async getAllProducts() {
    const products = await this.productService.getAllProducts();
    if (products instanceof ApiError) {
      throw products;
    }
    return products;
  }
  @UseFilters(new HttpExceptionFilter())
  @Get("specific/:id")
  async getSpecificProduct(@Param("id") id: string) {
    const product = await this.productService.getSpecificProduct(id);
    if (product instanceof ApiError) {
      throw product;
    }
    return product;
  }
  @UseFilters(new HttpExceptionFilter())
  @Get("category/:category")
  async getByCategory(@Param("category") category: "men" | "women" | "kids") {
    const products = await this.productService.getByCategory(category);
    if (products instanceof ApiError) {
      throw products;
    }
    return products;
  }
  @UseFilters(new HttpExceptionFilter())
  @Delete("delete/:id")
  async deleteProduct(@Param("id") id: string) {
    const response = await this.productService.deleteProduct(id);
    if (response instanceof ApiError) {
      throw response;
    }
    return response;
  }
}
