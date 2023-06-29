import { Module } from "@nestjs/common";
import { ProductsModule } from "./products/products.module";
import { PrismaModule } from './prisma/prisma.module';
import { CartModule } from "./cart/cart.module";

@Module({
  imports: [ProductsModule, PrismaModule, CartModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
