import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { cart_item } from "@prisma/client";
@Injectable()
export class CartItemService {
  constructor(private prismaService: PrismaService) {}
  async addCartItem(body: cart_item, cartId: number) {
    try {
      const { productId, quantity } = body;
      const cartItem = await this.prismaService.cart_item.create({
        data: {
          cartId,
          productId,
          quantity,
        },
      });
      if (!cartItem) {
        return null;
      }
      const cart = await this.prismaService.cart.update({
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
  async getCartItem(id: number) {
    try {
      const cartItem = await this.prismaService.cart_item.findUnique({
        where: { id },
      });
      return cartItem;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCartItem(id: number) {
    try {
      const cartItem = await this.prismaService.cart_item.delete({
        where: { id },
      });
      return cartItem;
    } catch (error) {
      console.log(error);
    }
  }
  async changeQuantity(id: number, quantity: number) {
    try {
      const cartItem = await this.prismaService.cart_item.update({
        where: { id },
        data: {
          quantity,
        },
      });
      return cartItem;
    } catch (error) {
      console.log(error);
    }
  }
}
