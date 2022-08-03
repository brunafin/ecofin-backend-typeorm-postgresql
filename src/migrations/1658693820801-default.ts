import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658693820801 implements MigrationInterface {
    name = 'default1658693820801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "monthly" ("id" SERIAL NOT NULL, "month" character varying NOT NULL, "year" character varying NOT NULL, "amount" integer NOT NULL, "outlay" integer NOT NULL, "economy" integer NOT NULL, CONSTRAINT "PK_a9dafeff7370c41ce1dc87fd7f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "installments" ("id" SERIAL NOT NULL, "number_installment" integer NOT NULL, "value" integer NOT NULL, "month" character varying NOT NULL, "year" character varying NOT NULL, "outlay_id" integer, CONSTRAINT "PK_c74e44aa06bdebef2af0a93da1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "outlays" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "value" integer NOT NULL, "installments_quantity" integer NOT NULL, "date" TIMESTAMP NOT NULL, "pay" TIMESTAMP NOT NULL, CONSTRAINT "PK_7d98dd3db7d3a6be7cdde802db6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "installments" ADD CONSTRAINT "FK_aaffd22deb48528e3cc1606fdc2" FOREIGN KEY ("outlay_id") REFERENCES "outlays"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "installments" DROP CONSTRAINT "FK_aaffd22deb48528e3cc1606fdc2"`);
        await queryRunner.query(`DROP TABLE "outlays"`);
        await queryRunner.query(`DROP TABLE "installments"`);
        await queryRunner.query(`DROP TABLE "monthly"`);
    }

}
