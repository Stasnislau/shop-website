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
import { CartDTO } from "./dto";

@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}
  @Post("add")
  addToCart(@Body() body: CartDTO) {
    // this.cartService.addToCart(body);
  }
  @Delete("delete/:id")
  deleteCart(@Param("id") id: number) {
    // this.cartService.deleteCartItem(id);
  }

  @Put("update/:id")
  updateCart(@Param("id") id: number, @Body() body: CartDTO) {
    // this.cartService.updateCartItem(id, body);
  }

  @Get("get/:id")
  getCart(@Param("id") id: number) {
    // this.cartService.getCart(id);
  }
}
