import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { cart, product, cart_item } from "@prisma/client";
import { CartItemDTO } from "./dto";

@Injectable()
export class CartService {
  constructor(private PrismaService: PrismaService) {}
  async addToCart(body: CartItemDTO) {
    try {
      const { cartId, productId, quantity } = body;
      const cartItem = await this.PrismaService.cart_item.create({
        data: {
          cartId,
          productId,
          quantity,
        },
      });
      const cart = await this.PrismaService.cart.update({
        where: { id: cartId },
        data: {
          items: {
            connect: {
              id: cartItem.id,
            },
          },
        },
      });
      return cart.id;
    } catch (error) {
      console.log(error);
    }
  }
  async getCart(id: number) {
    try {
      const cart = await this.PrismaService.cart.findUnique({
        where: { id },
        select: {
          id: true,
          items: true,
        },
      });
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(id: number) {
    try {
      const cart = await this.PrismaService.cart.delete({
        where: { id },
      });
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
}
