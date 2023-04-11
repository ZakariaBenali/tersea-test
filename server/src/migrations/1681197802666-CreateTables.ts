import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1681197802666 implements MigrationInterface {
	name = 'CreateTables1681197802666';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "history" ("id" SERIAL NOT NULL, "action" "public"."history_action_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "invitationId" uuid NOT NULL, CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "invitation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "status" "public"."invitation_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer NOT NULL, CONSTRAINT "UQ_bcb0a0d2333443083582a05cdd8" UNIQUE ("email"), CONSTRAINT "PK_beb994737756c0f18a1c1f8669c" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "history" ADD CONSTRAINT "FK_7d339708f0fa8446e3c4128dea9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "history" ADD CONSTRAINT "FK_0883ef25c4b48f327762804222a" FOREIGN KEY ("invitationId") REFERENCES "invitation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "invitation" ADD CONSTRAINT "FK_757968494b8501e4e3b27860fb0" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "FK_86586021a26d1180b0968f98502" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_86586021a26d1180b0968f98502"`);
		await queryRunner.query(`ALTER TABLE "invitation" DROP CONSTRAINT "FK_757968494b8501e4e3b27860fb0"`);
		await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_0883ef25c4b48f327762804222a"`);
		await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_7d339708f0fa8446e3c4128dea9"`);
		await queryRunner.query(`DROP TABLE "user"`);
		await queryRunner.query(`DROP TABLE "company"`);
		await queryRunner.query(`DROP TABLE "invitation"`);
		await queryRunner.query(`DROP TABLE "history"`);
	}
}
