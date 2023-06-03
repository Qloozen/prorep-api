import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedUserIdType1685820592140 implements MigrationInterface {
    name = 'ChangedUserIdType1685820592140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`set\` DROP FOREIGN KEY \`FK_4ca7d19cfc717a25f55950a76fb\``);
        await queryRunner.query(`ALTER TABLE \`exercise\` DROP FOREIGN KEY \`FK_0600c3e625643c18323ede9ae02\``);
        await queryRunner.query(`ALTER TABLE \`exercise_group\` DROP FOREIGN KEY \`FK_b002cd956be05b8ba1564fe6bdf\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id\` varchar(255) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`set\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`set\` ADD \`userId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`exercise\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`exercise\` ADD \`userId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`exercise_group\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`exercise_group\` ADD \`userId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`set\` ADD CONSTRAINT \`FK_4ca7d19cfc717a25f55950a76fb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exercise\` ADD CONSTRAINT \`FK_0600c3e625643c18323ede9ae02\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exercise_group\` ADD CONSTRAINT \`FK_b002cd956be05b8ba1564fe6bdf\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exercise_group\` DROP FOREIGN KEY \`FK_b002cd956be05b8ba1564fe6bdf\``);
        await queryRunner.query(`ALTER TABLE \`exercise\` DROP FOREIGN KEY \`FK_0600c3e625643c18323ede9ae02\``);
        await queryRunner.query(`ALTER TABLE \`set\` DROP FOREIGN KEY \`FK_4ca7d19cfc717a25f55950a76fb\``);
        await queryRunner.query(`ALTER TABLE \`exercise_group\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`exercise_group\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`exercise\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`exercise\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`set\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`set\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`exercise_group\` ADD CONSTRAINT \`FK_b002cd956be05b8ba1564fe6bdf\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exercise\` ADD CONSTRAINT \`FK_0600c3e625643c18323ede9ae02\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`set\` ADD CONSTRAINT \`FK_4ca7d19cfc717a25f55950a76fb\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
