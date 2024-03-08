import { PermissionEntity } from 'src/permission/entities/permission.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'username',
    type: 'varchar',
    length: '50',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    name: 'phonenumber',
    type: 'varchar',
    length: '10',
    nullable: false,
    unique: true,
  })
  phonenumber: number;

  @Column({
    name: 'password',
    type: 'varchar',
    length: '100',
    nullable: false,
  })
  password: string;

  @ManyToMany(() => RoleEntity, (roles) => roles.users)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RoleEntity[];

  @ManyToMany(() => PermissionEntity, (permissions) => permissions.users)
  @JoinTable({
    name: 'users_permissions',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: PermissionEntity[];

  constructor(user?: Partial<UserEntity>) {
    Object.assign(this, user);
  }
}
