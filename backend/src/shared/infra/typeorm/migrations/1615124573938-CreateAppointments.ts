import { MigrationInterface, QueryRunner, Table } from "typeorm";


export default class CreateAppointments1614700929361 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'appointments',
				columns: 
				[
					{ 
						name: 'id', 
						type: 'uuid', 
						isPrimary: true, 
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()'
					},
					{
						name: 'date',
						type: 'timestamp'
					},
					{
						name: 'provider_id',
						type: 'uuid',
						isNullable: true
					},
					{
						name: 'user_id',
						type: 'uuid',
						isNullable: true
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()'
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()'
					}
				],

				foreignKeys: 
				[
					{
						name: 'provider_appointment',
						columnNames: ['provider_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'users',
						onDelete: 'SET NULL',
						onUpdate: 'CASCADE'
					},
					{
						name: 'user_appointment',
						columnNames: ['user_id'],
						referencedColumnNames: ['id'],
						referencedTableName: 'users',
						onDelete: 'SET NULL',
						onUpdate: 'CASCADE'
					}
				]
			})
		);
	}

   public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('appointments');
	}
}
