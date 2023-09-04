import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { cart_item } from "@prisma/client";
import ApiError from "src/exceptions/api-error";

@Injectable()
export class CartService {
  constructor(private PrismaService: PrismaService) {}
  async createCart() {
    const cart = await this.PrismaService.cart.create({
      data: {
        items: {
          create: [],
        },
      },
    });
    if (!cart) {
      return ApiError.internal("Error creating cart");
    }
    return cart.id;
  }
  async addCart(body: cart_item) {
    const { cartId, productId, quantity, chosenColor, chosenSize } = body;
    const cart = await this.PrismaService.cart.findUnique({
      where: { id: Number(cartId) },
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
              chosenColor,
              chosenSize,
            },
          },
        },
      });
      if (!newCart) {
        return ApiError.internal("Error creating cart");
      }
      return newCart.id;
    } else {
      const isAlreadyInCart = await this.PrismaService.cart_item.findFirst({
        where: {
          cartId: Number(cartId),
          productId: Number(productId),
        },
      });
      if (isAlreadyInCart) {
        return ApiError.badRequest("Item already in cart");
      }
      const cartItem = await this.PrismaService.cart_item.create({
        data: {
          cartId: Number(cartId),
          productId,
          quantity,
          chosenColor,
          chosenSize,
        },
      });
      if (!cartItem) {
        return ApiError.internal("Error adding cart item");
      }
      const cart = await this.PrismaService.cart.update({
        where: { id: Number(cartId) },
        data: {
          items: {
            connect: {
              id: cartItem.id,
            },
          },
        },
      });
      if (!cart) {
        return ApiError.internal("Error adding cart item");
      }
      return cart.id;
    }
  }
  async getCart(id: number) {
    const cart = await this.PrismaService.cart.findUnique({
      where: { id },
      select: {
        id: true,
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                prices: true,
                gallery: true,
                sizes: true,
                colors: true,
              },
            },
          },
        },
      },
    });
    if (!cart) {
      return ApiError.notFound("Cart not found");
    }
    return cart;
  }

  async deleteCart(id: number) {
    const cart = await this.PrismaService.cart.delete({
      where: { id },
    });
    if (!cart) {
      return ApiError.internal("Error deleting cart");
    }
    if (cart.id === id) {
      return { message: "Cart deleted successfully" };
    }
  }
  async updateCart(id: number, body: cart_item[]) {
    const cart = await this.PrismaService.cart.update({
      where: { id },
      data: {
        items: {
          create: body,
        },
      },
    });
    if (!cart) {
      return ApiError.internal("Error updating cart");
    }
    return cart;
  }

  async buyCart(cartId: number) {
    const cart = await this.PrismaService.cart.findUnique({
      where: { id: cartId },
      select: {
        id: true,
        items: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!cart) {
      return ApiError.notFound("Cart not found");
    }
    if (cart.items.length === 0) {
      return ApiError.badRequest("Cart is empty");
    }
    const cartItems = await this.PrismaService.cart_item.deleteMany({
      where: { cartId },
    });
    if (!cartItems) {
      return ApiError.internal("Error buying cart");
    }
    return {
      message: "Cart bought successfully",
    };
  }
}
