import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'products';
const brandTableName = 'brands';
const categoryTableName = 'categories';

export class CreateProductTable1690219514667 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            isNullable: false,
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'discount',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'count',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'brand_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'category_id',
            type: 'integer',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['brand_id'],
            referencedColumnNames: ['id'],
            referencedTableName: brandTableName,
          },
          {
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: categoryTableName,
          },
        ],
      }),
      true,
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
