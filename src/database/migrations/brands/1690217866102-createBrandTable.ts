import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'brands';

export class CreateBrandTable1690217866102 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isNullable: false,
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '20',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'path',
            type: 'varchar',
            length: '250',
            isNullable: false,
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
