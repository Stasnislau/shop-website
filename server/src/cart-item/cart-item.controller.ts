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
import { cart_item } from "@prisma/client";
import { cartItemDto } from "./dto";
import ApiError from "src/exceptions/api-error";

@Controller("cart-item")
export class CartItemController {
  constructor(private cartItemService: CartItemService) {}
  @Get("specific/:id")
  async getCartItem(@Param("id") id: number) {
    const item = await this.cartItemService.getCartItem(id);
    if (item instanceof ApiError) {
      throw item;
    }
    return item;
  }
  @Post("add/:cartId")
  async createCartItem(
    @Param("cartId") cartId: number,
    @Body() cartItem: cart_item
  ) {
    const item = await this.cartItemService.addCartItem(cartItem, cartId);
    if (item instanceof ApiError) {
      throw item;
    }
    return item;
  }
  @Put("update/:id")
  async updateCartItem(@Param("id") id: number, @Body() values: cartItemDto) {
    const cart = await this.cartItemService.update(id, values);
    if (cart instanceof ApiError) {
      throw cart;
    }
    return cart;
  }

  @Delete("delete/:id")
  async deleteCartItem(@Param("id") id: number) {
    const result = await this.cartItemService.deleteCartItem(id);
    if (result instanceof ApiError) {
      throw result;
    }
    return result;
  }
}
