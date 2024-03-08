import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemsModule } from './order-items/order-items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ProductRepository } from 'src/products/repositories/product.repository';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ProductRepository],
  imports: [OrderItemsModule, TypeOrmModule.forFeature([OrderEntity])],
})
export class OrdersModule {}
