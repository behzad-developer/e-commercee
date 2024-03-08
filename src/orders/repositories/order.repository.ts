import { ProductEntity } from 'src/products/entities/product.entity';
import { OrderEntity } from '../entities/order.entity';
import { CreateOrderProductsDto } from '../dto/create-order.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { OrderItemEntity } from '../order-items/entities/order-item.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderStatusEnum } from '../enum/order.enum';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OrderReposotory extends Repository<OrderEntity> {
  constructor(private dataSource: DataSource) {
    super(OrderEntity, dataSource.createEntityManager());
  }

  async createAndSave(
    products: ProductEntity[],
    dto: CreateOrderProductsDto,
    user: UserEntity,
  ) {
    const date = Date.now();
    const orderNo = (Math.random() + 1).toString(36).substring(7);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const order = new OrderEntity({
        user: new UserEntity({ id: user.id }),
        phonenumber: user.phonenumber,
        createdAt: date,
        updatedAt: date,
        status: OrderStatusEnum.PENDING,
        orderNo,
        orderItems: dto.products.map((orderProduct) => {
          const product = products.find(
            (product) => product.id === orderProduct.productId,
          );
          return new OrderItemEntity({
            count: orderProduct.count,
            name: product.name,
            price: orderProduct.price * orderProduct.count,
            product,
          });
        }),
      });
      products.forEach((product) => {
        product.count =
          product.count -
          dto.products.find((prod) => prod.productId === product.id).count;
      });
      const newOrder = await queryRunner.manager.save(order);
      await queryRunner.manager.save(products);
      await queryRunner.commitTransaction();
      return newOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }
}
