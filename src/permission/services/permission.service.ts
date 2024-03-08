import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from '../entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionRepository: Repository<PermissionEntity>,
  ) {}
  create(createPermissionDto: CreatePermissionDto) {
    const permission = new PermissionEntity({
      name: createPermissionDto.name,
    });

    return this.permissionRepository.save(permission);
  }

  findAll() {
    return this.permissionRepository.createQueryBuilder('p').getMany();
  }

  findOne(id: number) {
    return this.permissionRepository
      .createQueryBuilder('p')
      .where('p.id=:id', { id })
      .getOne();
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const { name } = updatePermissionDto;
    const permission = new PermissionEntity({
      id,
      name,
    });
    return this.permissionRepository.save(permission);
  }

  remove(id: number) {
    const entity = new PermissionEntity({
      id,
    });
    return this.permissionRepository.remove(entity);
  }
}
