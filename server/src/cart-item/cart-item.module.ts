import { Module } from '@nestjs/common';
import { CartItemController } from './cart-item.controller';
import { CartItemService } from './cart-item.service';

@Module({
  controllers: [CartItemController],
  providers: [CartItemService]
})
export class CartItemModule {}
