import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedSetsEntity1685792162425 implements MigrationInterface {
    name = 'AddedSetsEntity1685792162425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`set\` (\`id\` int NOT NULL AUTO_INCREMENT, \`repetitions\` int NOT NULL, \`weight_kg\` int NOT NULL, \`userId\` int NULL, \`exerciseId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`set\` ADD CONSTRAINT \`FK_4ca7d19cfc717a25f55950a76fb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`set\` ADD CONSTRAINT \`FK_4b4bcca171257ea6008d51c2fd1\` FOREIGN KEY (\`exerciseId\`) REFERENCES \`exercise\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`set\` DROP FOREIGN KEY \`FK_4b4bcca171257ea6008d51c2fd1\``);
        await queryRunner.query(`ALTER TABLE \`set\` DROP FOREIGN KEY \`FK_4ca7d19cfc717a25f55950a76fb\``);
        await queryRunner.query(`DROP TABLE \`set\``);
    }

}
