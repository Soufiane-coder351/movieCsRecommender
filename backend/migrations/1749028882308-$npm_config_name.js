/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class  $npmConfigName1749028882308 {
    name = ' $npmConfigName1749028882308'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "rating" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                "ratingValue" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_rating" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                "ratingValue" integer NOT NULL,
                CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_1a3badf27affbca3a224f01f7de" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_rating"("userId", "movieId", "ratingValue")
            SELECT "userId",
                "movieId",
                "ratingValue"
            FROM "rating"
        `);
        await queryRunner.query(`
            DROP TABLE "rating"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_rating"
                RENAME TO "rating"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "rating"
                RENAME TO "temporary_rating"
        `);
        await queryRunner.query(`
            CREATE TABLE "rating" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                "ratingValue" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "rating"("userId", "movieId", "ratingValue")
            SELECT "userId",
                "movieId",
                "ratingValue"
            FROM "temporary_rating"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_rating"
        `);
        await queryRunner.query(`
            DROP TABLE "rating"
        `);
    }
}
