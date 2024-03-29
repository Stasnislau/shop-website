import { ProductsModule } from "./products/products.module";
import { PrismaModule } from "./prisma/prisma.module";
import { CartModule } from "./cart/cart.module";
import { CartItemModule } from "./cart-item/cart-item.module";
import { AppController } from "./app.controller";
import { CurrencyModule } from './currency/currency.module';
import { Module } from "@nestjs/common";

@Module({
  imports: [ProductsModule, PrismaModule, CartModule, CartItemModule, CurrencyModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
