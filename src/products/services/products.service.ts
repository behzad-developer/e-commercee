import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { ProductQueryDto } from '../dto/product-query.dto';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}
  async create(CreateProductDto: CreateProductDto) {
    return this.productRepository.createAndSave(CreateProductDto);
  }

  findAll(dto: ProductQueryDto) {
    return this.productRepository.findAll(dto);
  }

  findOne(id: number) {
    return this.productRepository.findOneByCredential(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const { name } = updateProductDto;
    const product = new ProductEntity({
      id,
      name,
    });
    return this.productRepository.save(product);
  }

  remove(id: number) {
    const entity = new ProductEntity({
      id,
    });
    return this.productRepository.remove(entity);
  }
}
