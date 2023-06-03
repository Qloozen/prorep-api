import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedJoinTable1685788881013 implements MigrationInterface {
    name = 'ChangedJoinTable1685788881013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ExerciseGroups_Exercises\` (\`exercise_group_id\` int NOT NULL, \`exercise_id\` int NOT NULL, INDEX \`IDX_6ff00f6edda00ca7fcdfbfd853\` (\`exercise_group_id\`), INDEX \`IDX_bcb8289de4332f7d887bb50ba6\` (\`exercise_id\`), PRIMARY KEY (\`exercise_group_id\`, \`exercise_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ExerciseGroups_Exercises\` ADD CONSTRAINT \`FK_6ff00f6edda00ca7fcdfbfd853c\` FOREIGN KEY (\`exercise_group_id\`) REFERENCES \`exercise_group\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`ExerciseGroups_Exercises\` ADD CONSTRAINT \`FK_bcb8289de4332f7d887bb50ba60\` FOREIGN KEY (\`exercise_id\`) REFERENCES \`exercise\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ExerciseGroups_Exercises\` DROP FOREIGN KEY \`FK_bcb8289de4332f7d887bb50ba60\``);
        await queryRunner.query(`ALTER TABLE \`ExerciseGroups_Exercises\` DROP FOREIGN KEY \`FK_6ff00f6edda00ca7fcdfbfd853c\``);
        await queryRunner.query(`DROP INDEX \`IDX_bcb8289de4332f7d887bb50ba6\` ON \`ExerciseGroups_Exercises\``);
        await queryRunner.query(`DROP INDEX \`IDX_6ff00f6edda00ca7fcdfbfd853\` ON \`ExerciseGroups_Exercises\``);
        await queryRunner.query(`DROP TABLE \`ExerciseGroups_Exercises\``);
    }

}
