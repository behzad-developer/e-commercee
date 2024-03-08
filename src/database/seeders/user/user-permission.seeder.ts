import { PermissionEntity } from 'src/permission/entities/permission.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

const usersPermissions = [
  {
    name: 'users.create',
    phonenumber: 62123456,
  },
  {
    name: 'users.update',
    phonenumber: 62123456,
  },
  {
    name: 'users.delete',
    phonenumber: 62123456,
  },
];

export class UserPermissionSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    try {
      const userRepository = dataSource.getRepository(UserEntity);
      const permissionRepository = dataSource.getRepository(PermissionEntity);
      const userPhonenumber = usersPermissions.map(
        (userpermission) => userpermission.phonenumber,
      );
      const permissionNames = usersPermissions.map(
        (userpermission) => userpermission.name,
      );
      const users = await userRepository
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.permissions', 'permissions')
        .where('users.phonenumber IN (:...phonenumber)', {
          phonenumber: userPhonenumber,
        })
        .getMany();
      const permissions = await permissionRepository
        .createQueryBuilder('permissions')
        .where('permissions.name IN (:...names)', { names: permissionNames })
        .getMany();
      usersPermissions.forEach((userPermission) => {
        users.forEach((user) => {
          if (user.phonenumber == userPermission.phonenumber) {
            const permissionCheck = user.permissions.find(
              (permission) => permission.name === userPermission.name,
            );
            if (!permissionCheck) {
              user.permissions.push(
                permissions.find(
                  (permission) => permission.name === userPermission.name,
                ),
              );
            }
          }
        });
      });

      const entities = await userRepository.save(users);
    } catch (error) {
      console.log(error);
    }
  }
}
