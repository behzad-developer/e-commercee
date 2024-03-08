import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'categories_closure';
const categoryTableName = 'categories';

export class CreateCategoriesClosuresTable1690054141847
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id_ancestor',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'id_descendant',
            type: 'integer',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['id_ancestor'],
            referencedColumnNames: ['id'],
            referencedTableName: categoryTableName,
          },
          {
            columnNames: ['id_descendant'],
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
