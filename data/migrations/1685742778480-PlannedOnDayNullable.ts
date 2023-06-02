import { MigrationInterface, QueryRunner } from "typeorm";

export class PlannedOnDayNullable1685742778480 implements MigrationInterface {
    name = 'PlannedOnDayNullable1685742778480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exercise_group\` CHANGE \`planned_on_day\` \`planned_on_day\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exercise_group\` CHANGE \`planned_on_day\` \`planned_on_day\` int NOT NULL`);
    }

}
