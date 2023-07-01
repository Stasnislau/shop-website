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
        items: {
          // createMany: [] as cart_item[],
        },
      },
    });
    return cart.id;
  }

  async getCart(id: number) {
    const cart = await this.PrismaService.cart.findUnique({
      where: { id },
      select: {
        id: true,
        items: true,
      },
    });
    return cart;
  }

  async deleteCart(id: number) {
    const cart = await this.PrismaService.cart.delete({
      where: { id },
    });
    return cart;
  }
}
