import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedExerciseGroups1685728121829 implements MigrationInterface {
    name = 'AddedExerciseGroups1685728121829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`exercise_group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`planned_on_day\` int NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`exercise_group\` ADD CONSTRAINT \`FK_b002cd956be05b8ba1564fe6bdf\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exercise_group\` DROP FOREIGN KEY \`FK_b002cd956be05b8ba1564fe6bdf\``);
        await queryRunner.query(`DROP TABLE \`exercise_group\``);
    }

}
