import { PermissionEntity } from 'src/permission/entities/permission.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

const rolesPermissions = [
  {
    permissionName: 'users.create',
    roleName: 'manager',
  },
  {
    permissionName: 'users.update',
    roleName: 'operator',
  },
];

export class RolePermissionSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    try {
      const roleRepository = dataSource.getRepository(RoleEntity);
      const permissionRepository = dataSource.getRepository(PermissionEntity);
      const roleNames = rolesPermissions.map(
        (rolePermission) => rolePermission.roleName,
      );
      const permissionNames = rolesPermissions.map(
        (rolePermission) => rolePermission.permissionName,
      );
      const permissions = await permissionRepository
        .createQueryBuilder('permissions')
        .where('permissions.name IN (:...names)', { names: permissionNames })
        .getMany();
      const roles = await roleRepository
        .createQueryBuilder('roles')
        .leftJoinAndSelect('roles.permissions', 'permissions')
        .where('roles.name IN (:...names)', { names: roleNames })
        .getMany();
      rolesPermissions.forEach((rolePermission) => {
        roles.forEach((role) => {
          if (role.name === rolePermission.roleName) {
            const permissionCheck = role.permissions.find(
              (permission) => (permission.name = rolePermission.permissionName),
            );
            if (!permissionCheck) {
              role.permissions.push(
                permissions.find(
                  (permissions) =>
                    permissions.name === rolePermission.permissionName,
                ),
              );
            }
          }
        });
      });
      const entities = await roleRepository.save(roles);
    } catch (error) {
      console.log(error);
    }
  }
}
