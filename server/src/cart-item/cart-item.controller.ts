import { Controller } from "@nestjs/common";
import { CartItemService } from "./cart-item.service";

@Controller("cart-item")
export class CartItemController {
  constructor(private cartItemService: CartItemService) {}
  getCartItem() {
    // this.cartItemService.getCartItem();
  }
  createCartItem() {
    // this.cartItemService.createCartItem();
  }
  updateCartItem() {
    // this.cartItemService.updateCartItem();
  }
  deleteCartItem() {
    // this.cartItemService.deleteCartItem();
  }
}
