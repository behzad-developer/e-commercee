import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { RoleInterface } from '../interfaces/role.interface';
import { PermissionEntity } from 'src/permission/entities/permission.entity';
import { RoleQueryDto } from '../dto/role-query.dto';

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(private dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }

  createAndSave(payload?: Partial<RoleInterface>) {
    const entity = new RoleEntity(payload);
    if (payload.roleId) {
      entity.role = new RoleEntity({
        id: payload.roleId,
      });
    }
    if (payload.permissionId) {
      entity.permission = new PermissionEntity({
        id: payload.permissionId,
      });
    }
    return this.save(entity);
  }

  findAll(dto: RoleQueryDto) {
    const { limit, search, skip } = dto;
    const query = this.createQueryBuilder('roles');
    if (search) {
      query.where('roles.name ILIKE (:search)', { search: `%${search}%` });
    }
    return query
      .take(limit)
      .skip((skip - 1) * limit)
      .getMany();
  }
  findOneByCredential(id: number) {
    return this.createQueryBuilder('r').where('r.id =:id', { id }).getOne();
  }
  findIds(ids: number[]) {
    return this.createQueryBuilder('roles')
      .where('roles.id IN (:...ids)', { ids })
      .getMany();
  }
}
