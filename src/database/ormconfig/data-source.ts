import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { UserSeeder } from '../seeders/user/user.seeder';
import { UserRoleSeeder } from '../seeders/user/user-role.seeder';
import { RoleSeeder } from '../seeders/roles/role.seeder';
import { UserPermissionSeeder } from '../seeders/user/user-permission.seeder';
import { RolePermissionSeeder } from '../seeders/roles/role-permission.seeder';
import { PermissionSeeder } from '../seeders/permissions/permission.seeder';

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  database: 'test',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'behzad01',
  synchronize: false,
  entities: ['dist/**/*.entity{.js,.ts}'],
  seeds: [
    UserSeeder,
    UserRoleSeeder,
    RoleSeeder,
    PermissionSeeder,
    UserPermissionSeeder,
    RolePermissionSeeder,
  ],
  migrations: ['dist/database/migrations/**/*{.js,.ts}'],
};
export default new DataSource(dataSourceOptions);
