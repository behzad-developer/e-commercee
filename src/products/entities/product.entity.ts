import { BrandEntity } from 'src/brands/entities/brand.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class ProductEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    name: 'count',
    type: 'integer',
    nullable: false,
  })
  count: number;

  @Column({
    name: 'price',
    type: 'float',
    nullable: false,
  })
  price: number;

  @Column({
    name: 'discount',
    type: 'float',
    nullable: true,
  })
  discount: number;

  @ManyToOne(() => BrandEntity, (brand) => brand.products)
  @JoinColumn({
    name: 'brand_id',
    referencedColumnName: 'id',
  })
  brand: BrandEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
  })
  category: CategoryEntity;

  constructor(product?: Partial<ProductEntity>) {
    Object.assign(this, product);
  }
}
