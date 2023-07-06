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
  @Post("add")
  addCart(@Body() body: cart_item) {
    return this.cartService.addCart(body);
  }
  @Put("update/:id")
  updateCart(@Param("id") id: string, @Body() body: cart_item[]) {
    return this.cartService.updateCart(Number(id), body);
  }
  @Get("get/:id")
  getCart(@Param("id") id: string) {
    return this.cartService.getCart(Number(id));
  }

  @Delete("delete/:id")
  deleteCart(@Param("id") id: string) {
    return this.cartService.deleteCart(Number(id));
  }
}
