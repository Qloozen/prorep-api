import { MigrationInterface, QueryRunner } from "typeorm";

export class DateToSet1692733924756 implements MigrationInterface {
    name = 'DateToSet1692733924756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`set\` ADD \`date_created\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`set\` DROP COLUMN \`date_created\``);
    }

}
