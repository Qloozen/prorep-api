import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedProviderId1685820709914 implements MigrationInterface {
    name = 'RemovedProviderId1685820709914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`provider_UID\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`provider_UID\` varchar(255) NOT NULL`);
    }

}
