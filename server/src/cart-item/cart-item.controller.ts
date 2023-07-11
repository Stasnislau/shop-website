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

@Controller("cart-item")
export class CartItemController {
  constructor(private cartItemService: CartItemService) {}
  @Get("specific/:id")
  getCartItem(@Param("id") id: number) {
    this.cartItemService.getCartItem(id);
  }
  @Post("add")
  createCartItem(@Param("cartId") cartId: number, @Body() cartItem: cart_item) {
    this.cartItemService.addCartItem(cartItem, cartId);
  }
  @Put("update/:id")
  updateCartItem(@Param("id") id: number, @Body() value: number) {
    this.cartItemService.changeQuantity(id, value);
  }

  @Delete("delete/:id")
  deleteCartItem(@Param("id") id: number) {
    this.cartItemService.deleteCartItem(id);
  }
}
