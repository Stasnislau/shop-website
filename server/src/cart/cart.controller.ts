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
import { cart_item, cart } from "@prisma/client";

@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}
  @Get("get/:id")
  getCart(@Param("id") id: number) {
    this.cartService.getCart(id);
  }

  @Post("add")
  addCart(@Body() body: cart_item) {
    this.cartService.addCart(body);
  }
  @Delete("delete/:id")
  deleteCart(@Param("id") id: number) {
    this.cartService.deleteCart(id);
  }

  @Put("update/:id")
  updateCart(@Param("id") id: number, @Body() body: cart) {
    this.cartService.updateCart(id, body);
  }
}
