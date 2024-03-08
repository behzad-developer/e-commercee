import { ProductEntity } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'brands',
})
export class BrandEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: '20',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    name: 'path',
    type: 'varchar',
    length: '250',
    nullable: false,
  })
  path: string;

  @OneToMany(() => ProductEntity, (products) => products.brand)
  products: ProductEntity[];

  constructor(brand?: Partial<BrandEntity>) {
    Object.assign(this, brand);
  }
}
