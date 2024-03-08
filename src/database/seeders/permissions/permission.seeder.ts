import { PermissionEntity } from 'src/permission/entities/permission.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

const permissions = [
  {
    name: 'users.create',
  },
  {
    name: 'users.update',
  },
];
export class PermissionSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const permissionRepository = dataSource
      .createEntityManager()
      .getRepository(PermissionEntity);
    const names = permissions.map((permission) => permission.name);
    const permissionEntities = await permissionRepository
      .createQueryBuilder('permissions')
      .where('permissions.name IN (:...names)', { names })
      .getMany();
    const entities: PermissionEntity[] = [];
    permissions.forEach((permission) => {
      const permissionCheck = permissionEntities.find(
        (permissionEntity) => permissionEntity.name === permission.name,
      );
      if (!permissionCheck) {
        entities.push(
          new PermissionEntity({
            name: permission.name,
          }),
        );
      }
    });
    if (entities.length) {
      await permissionRepository.save(entities);
    }
  }
}
