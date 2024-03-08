import { RoleEntity } from 'src/roles/entities/role.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

const roles: Partial<RoleEntity>[] = [
  {
    name: 'manager',
  },
  {
    name: 'courier',
  },
  {
    name: 'operator',
  },
];
export class RoleSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const roleRepository = dataSource
      .createEntityManager()
      .getRepository(RoleEntity);
    const names = roles.map((role) => role.name);
    const roleEntities = await roleRepository
      .createQueryBuilder('roles')
      .where('roles.name IN (:...names)', { names })
      .getMany();
    const entities: RoleEntity[] = [];
    roles.forEach((role) => {
      const roleCheck = roleEntities.find(
        (roleEntity) => roleEntity.name === role.name,
      );
      if (!roleCheck) {
        entities.push(
          new RoleEntity({
            name: role.name,
          }),
        );
      }
    });
    if (entities.length) {
      await roleRepository.save(entities);
    }
  }
}
