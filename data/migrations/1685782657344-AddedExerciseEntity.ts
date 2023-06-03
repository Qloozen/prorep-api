import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedExerciseEntity1685782657344 implements MigrationInterface {
    name = 'AddedExerciseEntity1685782657344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`exercise\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`exercise\` ADD CONSTRAINT \`FK_0600c3e625643c18323ede9ae02\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exercise\` DROP FOREIGN KEY \`FK_0600c3e625643c18323ede9ae02\``);
        await queryRunner.query(`DROP TABLE \`exercise\``);
    }

}
