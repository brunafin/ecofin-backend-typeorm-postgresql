import { MigrationInterface, QueryRunner } from "typeorm";

export class default1659488309395 implements MigrationInterface {
    name = 'default1659488309395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "outlays" ADD "basic" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "outlays" DROP COLUMN "basic"`);
    }

}
