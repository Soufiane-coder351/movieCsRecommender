/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class MovieUpdate1749130554307 {
    name = 'MovieUpdate1749130554307'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "date" varchar NOT NULL,
                "genre" text NOT NULL,
                "description" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                "keywords" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "title",
                    "date",
                    "genre",
                    "description",
                    "keywords",
                    "poster_path"
                )
            SELECT "id",
                "title",
                "date",
                "genre",
                "description",
                "",
                "poster_path"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "date" varchar NOT NULL,
                "genre" text NOT NULL,
                "description" varchar NOT NULL,
                "poster_path" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "title",
                    "date",
                    "genre",
                    "description",
                    "poster_path"
                )
            SELECT "id",
                "title",
                "date",
                "genre",
                "description",
                "poster_path"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
    }
}
