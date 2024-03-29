import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { cart_item } from "@prisma/client";
import ApiError from "../exceptions/api-error";
import { cartItemDto } from "./dto";
@Injectable()
export class CartItemService {
  constructor(private prismaService: PrismaService) {}
  async addCartItem(body: cart_item, cartId: number) {
    const { productId, quantity, chosenColor, chosenSize } = body;
    if (quantity < 1) {
      return ApiError.badRequest("Quantity cannot be less than 1");
    }
    const isAlreadyInCart = await this.prismaService.cart_item.findFirst({
      where: {
        cartId: Number(cartId),
        productId: Number(productId),
      },
    });
    if (isAlreadyInCart) {
      return ApiError.badRequest("Item already in cart");
    }
    const cartItem = await this.prismaService.cart_item.create({
      data: {
        cartId,
        productId,
        quantity,
        chosenColor,
        chosenSize,
      },
    });
    if (!cartItem) {
      return ApiError.badRequest("Cannot create cart item");
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
    if (!cart) {
      return ApiError.badRequest("Cannot add cart item");
    }
    return cart.id;
  }
  async getCartItem(id: number) {
    const cartItem = await this.prismaService.cart_item.findUnique({
      where: { id },
    });
    if (!cartItem) {
      return ApiError.badRequest("Cannot find cart item");
    }
    return cartItem;
  }

  async deleteCartItem(id: number) {
      const isAlreadyInCart = await this.prismaService.cart_item.findFirst({
        where: {
          id,
        },
      });
      if (!isAlreadyInCart) {
        return ApiError.notFound("Item not in cart");
      }
      const cartItem = await this.prismaService.cart_item.delete({
        where: { id },
      });
      if (!cartItem) {
        throw ApiError.badRequest("Cannot delete cart item");
      }
      return cartItem;
  }
  async update(cartItemId: number, body: cartItemDto) {
      const { quantity, chosenColor, chosenSize } = body;
      if (quantity < 1) {
        return ApiError.badRequest("Quantity cannot be less than 1");
      }
      const isAlreadyInCart = await this.prismaService.cart_item.findFirst({
        where: {
          id: cartItemId,
        },
      });
      if (!isAlreadyInCart) {
        return ApiError.notFound("Item not in cart");
      }
      const cartItem = await this.prismaService.cart_item.update({
        where: { id: cartItemId },
        data: {
          quantity,
          chosenColor,
          chosenSize,
        },
      });
      if (!cartItem) {
        return ApiError.badRequest("Cannot update cart item");
      }
      return cartItem;
  }
}
