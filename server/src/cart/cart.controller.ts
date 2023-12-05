import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  Put,
  Param,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { cart_item } from "@prisma/client";
import ApiError from "../exceptions/api-error";

@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}
  @Post("create")
  async createCart() {
    const cart = await this.cartService.createCart();
    if (cart instanceof ApiError) {
      throw cart;
    }
    return cart;
  }
  @Post("add")
  async addCart(@Body() body: cart_item) {
    const cart = await this.cartService.addCart(body);
    if (cart instanceof ApiError) {
      throw cart;
    }
    return cart;
  }
  @Put("update/:id")
  async updateCart(@Param("id") id: string, @Body() body: cart_item[]) {
    const cart = this.cartService.updateCart(Number(id), body);
    if (cart instanceof ApiError) {
      throw cart;
    }
    return cart;
  }
  @Get("get/:id")
  async getCart(@Param("id") id: string) {
    const cart = this.cartService.getCart(Number(id));
    if (cart instanceof ApiError) {
      throw cart;
    }
    return cart;
  }

  @Delete("delete/:id")
  async deleteCart(@Param("id") id: string) {
    const cart = this.cartService.deleteCart(Number(id));
    if (cart instanceof ApiError) {
      throw cart;
    }
    return cart;
  }

  @Post("buy/:cartId")
  async buyCart(@Param("cartId") cartId: string) {
    const cart = await this.cartService.buyCart(Number(cartId));
    if (cart instanceof ApiError) {
      throw cart;
    }
    return cart;
  }
}
