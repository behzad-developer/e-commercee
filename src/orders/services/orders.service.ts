import { Injectable } from '@nestjs/common';
import { CreateOrderProductsDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { ProductRepository } from 'src/products/repositories/product.repository';
import { OrderErrorProductInterface } from '../interfaces/order-product-error.interface';

@Injectable()
export class OrdersService {
  constructor(private productRepository: ProductRepository) {}
  async create(createOrderDto: CreateOrderProductsDto) {
    const productIds = createOrderDto.products.map(
      (product) => product.productId,
    );
    const products = await this.productRepository.findIds(productIds);

    const errorProducts: OrderErrorProductInterface[] = [];
    createOrderDto.products.forEach((orderProduct) => {
      const product = products.find(
        (product) => product.id === orderProduct.productId,
      );
      if (!product) {
        errorProducts.push({
          id: orderProduct.productId,
          message: 'This product is not available',
        });
      } else {
        if (product.price !== orderProduct.price) {
          errorProducts.push({
            id: orderProduct.productId,
            message: 'Price is not valid',
            parameter: product.price,
          });
        }
      }
      if (product.count < orderProduct.count) {
        errorProducts.push({
          id: orderProduct.productId,
          message: 'Out of stock',
          parameter: product.count,
        });
      }
    });
    if (errorProducts.length) {
      return errorProducts;
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a createOrder#${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
