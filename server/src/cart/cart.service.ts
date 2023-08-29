import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { cart, product, cart_item } from "@prisma/client";
import ApiError from "src/exceptions/api-error";

@Injectable()
export class CartService {
  constructor(private PrismaService: PrismaService) {}
  async createCart() {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }
  async addCart(body: cart_item) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(id: number) {
    try {
      const cart = await this.PrismaService.cart.delete({
        where: { id },
      });
      if (!cart) {
        return ApiError.internal("Error deleting cart");
      }
      if (cart.id === id) {
        return "Cart deleted successfully";
      }
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
            create: body,
          },
        },
      });
      if (!cart) {
        return ApiError.internal("Error updating cart");
      }
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
}
