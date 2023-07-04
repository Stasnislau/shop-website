import { Module } from "@nestjs/common";
import { ProductsModule } from "./products/products.module";
import { PrismaModule } from "./prisma/prisma.module";
import { CartModule } from "./cart/cart.module";
import { CartItemModule } from "./cart-item/cart-item.module";
import { AppController } from "./app.controller";

@Module({
  imports: [ProductsModule, PrismaModule, CartModule, CartItemModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
