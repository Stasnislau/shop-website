import { Injectable } from "@nestjs/common";
import { ProductDTO } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
@Injectable({})
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async createProduct(body: ProductDTO) {
    const product = await this.prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        prices: {
          create: body.prices,
        },
        gallery: [...body.gallery],
        sizes: [...body.sizes],
        colors: [...body.colors],
        category: body.category,
      },
    });
  }
}
