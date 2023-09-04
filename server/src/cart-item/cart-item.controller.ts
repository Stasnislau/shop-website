import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { CartItemService } from "./cart-item.service";
import { cart_item } from "../../../node_modules/prisma/prisma-client";
import { cartItemDto } from "./dto";
import ApiError from "src/exceptions/api-error";

@Controller("cart-item")
export class CartItemController {
  constructor(private cartItemService: CartItemService) {}
  @Get("get/:id")
  async getCartItem(@Param("id") id: string) {
    const item = await this.cartItemService.getCartItem(Number(id));
    if (item instanceof ApiError) {
      throw item;
    }
    return item;
  }
  @Post("add/:cartId")
  async createCartItem(
    @Param("cartId") cartId: string,
    @Body() cartItem: cart_item
  ) {
    const item = await this.cartItemService.addCartItem(cartItem, Number(cartId));
    if (item instanceof ApiError) {
      throw item;
    }
    return item;
  }
  @Put("update/:id")
  async updateCartItem(@Param("id") id: string, @Body() values: cartItemDto) {
    const cart = await this.cartItemService.update(Number(id), values);
    if (cart instanceof ApiError) {
      throw cart;
    }
    return cart;
  }

  @Delete("delete/:id")
  async deleteCartItem(@Param("id") id: string) {
    const result = await this.cartItemService.deleteCartItem(Number(id));
    if (result instanceof ApiError) {
      throw result;
    }
    return result;
  }
}
