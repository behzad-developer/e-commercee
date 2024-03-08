import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItemEntity } from '../order-items/entities/order-item.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity({
  name: 'orders',
})
export class OrderEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'address',
    type: 'varchar',
    nullable: false,
  })
  address: string;

  @Column({
    name: 'phonenumber',
    type: 'varchar',
    nullable: false,
  })
  phonenumber: number;

  @Column({
    name: 'user_id',
    type: 'integer',
    nullable: false,
  })
  userId: number;

  @Column({
    name: 'status',
    type: 'varchar',
    nullable: false,
  })
  status: string;

  @Column({
    name: 'order_no',
    type: 'varchar',
    nullable: false,
  })
  orderNo: string;

  @Column({
    name: 'created_at',
    type: 'bigint',
    nullable: false,
  })
  createdAt: number;

  @Column({
    name: 'updated_at',
    type: 'bigint',
    nullable: false,
  })
  updatedAt: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItems: OrderItemEntity[];

  constructor(order?: Partial<OrderEntity>) {
    Object.assign(this, order);
  }
}
