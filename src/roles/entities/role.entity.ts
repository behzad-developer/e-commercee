import { PermissionEntity } from 'src/permission/entities/permission.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'roles',
})
export class RoleEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToMany(() => UserEntity, (users) => users.roles)
  users: UserEntity[];

  @ManyToMany(() => PermissionEntity, (permissions) => permissions.roles)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: PermissionEntity[];
  role: RoleEntity;
  entity: PermissionEntity;
  permission: PermissionEntity;

  constructor(role?: Partial<RoleEntity>) {
    Object.assign(this, role);
  }
}
