import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductInterface } from '../interfaces/product.interface';
import { BrandEntity } from 'src/brands/entities/brand.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ProductQueryDto } from '../dto/product-query.dto';

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(private dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  createAndSave(payload?: Partial<ProductInterface>) {
    const entity = new ProductEntity(payload);
    if (payload.brandId) {
      entity.brand = new BrandEntity({
        id: payload.brandId,
      });
    }
    if (payload.categoryId) {
      entity.category = new CategoryEntity({
        id: payload.categoryId,
      });
    }
    console.log(entity);
    return this.save(entity);
  }
  findAll(dto: ProductQueryDto) {
    const { limit, search, skip } = dto;
    const query = this.createQueryBuilder('products');
    if (search) {
      query.where(
        'products.name ILIKE (:search) OR products.description ILIKE (:search)',
        {
          search: `%${search}%`,
        },
      );
    }
    return query
      .take(limit)
      .skip((skip - 1) * limit)
      .getMany();
  }
  findOneByCredential(id: number) {
    return this.createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id=:id', { id })
      .getOne();
  }

  findIds(ids: number[]) {
    return this.createQueryBuilder('products')
      .where('products.id IN (:...ids)', { ids })
      .getMany();
  }
}
