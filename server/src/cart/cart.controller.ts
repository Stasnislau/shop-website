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
  @Post("create")
  createCart() {
    // this.cartService.createCart();
  }
  @Post("add")
  addToCart(@Body() body: CartDTO) {
    // this.cartService.addToCart(body);
  }
  @Get("all")
  getAllCartItems() {
    // this.cartService.getAllCartItems();
  }

  @Delete("delete/:id")
  deleteCartItem(@Param("id") id: number) {
    // this.cartService.deleteCartItem(id);
  }

  @Put("update/:id")
  updateCartItem(@Param("id") id: number, @Body() body: CartDTO) {
    // this.cartService.updateCartItem(id, body);
  }
}
