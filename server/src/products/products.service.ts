import { Injectable } from "@nestjs/common";
import { Price, ProductDTO } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import cloudinary from "../cloudinary";
import ApiError from "src/exceptions/api-error";
@Injectable({})
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async createProduct(body: ProductDTO) {
    const prices = (await this.calculatePrice(body.price)) as Price[];
    if (
      prices.length === 0 ||
      !prices ||
      !body.gallery ||
      !body.gallery.length
    ) {
      return ApiError.badRequest("Invalid request body");
    }
    const promises = body.gallery.map(async (image) => {
      const res = await cloudinary.uploader.upload(
        image,
        {
          folder: "products",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            return ApiError.badGateway("Unable to upload images");
          }
        }
      );
      return res.secure_url;
    });
    const gallery = await Promise.all(promises);
    const product = await this.prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        prices: {
          create: prices,
        },
        gallery: [...gallery],

        sizes: [...body.sizes],
        colors: [...body.colors],
        category: body.category,
      },
    });
    if (!product) {
      return ApiError.internal("Unable to create product");
    }
    return product;
  }
  async getAllProducts() {
    try {
      const products = await this.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          prices: true,
          gallery: true,
          sizes: true,
          colors: true,
          category: true,
        },
      });
      if (!products) {
        return ApiError.notFound("No products found");
      }
      return products;
    } catch (error) {
      console.log(error);
    }
  }
  async getSpecificProduct(id: string) {
    if (!id || isNaN(Number(id)) || Number(id) < 1) {
      return ApiError.badRequest("provided id is not valid");
    }
    const product = await this.prisma.product.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        description: true,
        prices: true,
        gallery: true,
        sizes: true,
        colors: true,
        category: true,
      },
    });
    if (!product) {
      return ApiError.notFound("No product found");
    }
    return product;
  }

  async getByCategory(category: "men" | "women" | "kids") {
    if (!category) {
      return ApiError.badRequest("Invalid request body");
    }
    const products = await this.prisma.product.findMany({
      where: { category },
      include: {
        prices: {
          select: {
            currency: true,
            amount: true,
          },
        },
      },
    });
    if (!products) {
      return ApiError.notFound("No products found");
    }
    return products;
  }

  async deleteProduct(id: string) {
    const product = await this.prisma.product.delete({
      where: { id: Number(id) },
    });
    if (!product) {
      return ApiError.notFound("No product found");
    }
    return {message: "Product deleted successfully"};
  }

  private async calculatePrice(price: Price) {
    const newPrices = [] as Price[];
    const currencies = await this.prisma.currencies.findMany();
    const currentCurrency = currencies.find((item) => {
      return item.currency === price.currency;
    });
    currencies.forEach((item) => {
      if (item.currency === price.currency) {
        newPrices.push(price);
      }
      if (item.currency !== price.currency) {
        const newPrice = {
          currency: item.currency,
          amount: Number(
            (
              (price.amount * currentCurrency.exchangeRate) /
              item.exchangeRate
            ).toFixed(2)
          ),
        };
        newPrices.push(newPrice);
      }
    });
    return newPrices;
  }
}
