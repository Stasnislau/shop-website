import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { cart, product, cart_item } from "@prisma/client";
import { CartItemDTO } from "./dto";


@Injectable()
export class CartService {
  constructor(private PrismaService: PrismaService) {}
  async addToCart() {
    const cart = await this.PrismaService.cart.create({
      data: {
        // cartItems: [] as cart_item[],
      },
    });
    return cart.id;
  }
}
