import { RoleEntity } from 'src/roles/entities/role.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'permissions',
})
export class PermissionEntity {
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

  @ManyToMany(() => UserEntity, (users) => users.permissions)
  users: UserEntity[];

  @ManyToMany(() => RoleEntity, (roles) => roles.permissions)
  roles: RoleEntity[];

  constructor(permission?: Partial<PermissionEntity>) {
    Object.assign(this, permission);
  }
}
