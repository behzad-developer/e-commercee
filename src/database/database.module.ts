import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PermissionEntity } from 'src/permission/entities/permission.entity';
import { BrandEntity } from 'src/brands/entities/brand.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'behzad01',
      database: 'test',
      entities: [
        UserEntity,
        RoleEntity,
        PermissionEntity,
        BrandEntity,
        CategoryEntity,
        ProductEntity,
      ],
      synchronize: false,
      cache: {
        type: 'redis',
        duration: 60000,
        alwaysEnabled: true,
      },
    }),
  ],
})
export class DatabaseModule {}
