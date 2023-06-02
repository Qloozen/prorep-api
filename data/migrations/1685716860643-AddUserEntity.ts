import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEntity1685716860643 implements MigrationInterface {
    name = 'AddUserEntity1685716860643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`birthday\` datetime NOT NULL, \`current_weight_kg\` int NOT NULL, \`height_cm\` int NOT NULL, \`email\` varchar(255) NOT NULL, \`provider_UID\` varchar(255) NOT NULL, \`date_created\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
