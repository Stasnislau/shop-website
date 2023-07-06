import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { cart, product, cart_item } from "@prisma/client";

@Injectable()
export class CartService {
  constructor(private PrismaService: PrismaService) {}
  async addCart(body: cart_item) {
    try {
      const { cartId, productId, quantity } = body;
      const cart = await this.PrismaService.cart.findUnique({
        where: { id: cartId },
        select: {
          id: true,
        },
      });
      if (!cart) {
        const newCart = await this.PrismaService.cart.create({
          data: {
            items: {
              create: {
                productId,
                quantity,
              },
            },
          },
        });
        return newCart.id;
      } else {
        const cartItem = await this.PrismaService.cart_item.create({
          data: {
            cartId,
            productId,
            quantity,
          },
        });
        if (!cartItem) {
          return null;
        }
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
      }
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
      return "Cart deleted";
    } catch (error) {
      console.log(error);
    }
  }
  async updateCart(id: number, body: cart_item[]) {
    try {
      const cart = await this.PrismaService.cart.update({
        where: { id },
        data: {
          items: {
            set: body,
          },
        },
      });
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
}
