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

@Controller("cart-item")
export class CartItemController {
  constructor(private cartItemService: CartItemService) {}
  @Get("specific/:id")
  async getCartItem(@Param("id") id: number) {
    return await this.cartItemService.getCartItem(id);
  }
  @Post("add")
  async createCartItem(
    @Param("cartId") cartId: number,
    @Body() cartItem: cart_item
  ) {
    return await this.cartItemService.addCartItem(cartItem, cartId);
  }
  @Put("update/:id")
  async updateCartItem(@Param("id") id: number, @Body() value: cartItemDto ) {
    return await this.cartItemService.update(id, value);
  }

  @Delete("delete/:id")
  async deleteCartItem(@Param("id") id: number) {
    return await this.cartItemService.deleteCartItem(id);
  }
}
