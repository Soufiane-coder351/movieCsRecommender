/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class MovieAddActors1749195693295 {
    name = 'MovieAddActors1749195693295'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "date" varchar NOT NULL,
                "genre" text NOT NULL,
                "description" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                "keywords" varchar NOT NULL,
                "actors" text NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "title",
                    "date",
                    "genre",
                    "description",
                    "poster_path",
                    "keywords",
                    "actors"
                )
            SELECT "id",
                "title",
                "date",
                "genre",
                "description",
                "poster_path",
                "keywords",
                "[]"
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
                "poster_path" varchar NOT NULL,
                "keywords" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "title",
                    "date",
                    "genre",
                    "description",
                    "poster_path",
                    "keywords"
                )
            SELECT "id",
                "title",
                "date",
                "genre",
                "description",
                "poster_path",
                "keywords"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
    }
}
