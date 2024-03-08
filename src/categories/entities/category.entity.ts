import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({
  name: 'categories',
})
@Tree('closure-table')
export class CategoryEntity {
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

  @TreeParent()
  parent: CategoryEntity;

  @TreeChildren()
  children: CategoryEntity[];

  constructor(category?: Partial<CategoryEntity>) {
    Object.assign(this, category);
  }
}
