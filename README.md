## Prorep API

**Technologies used**

- NextJS
- Firebase authentication
- TypeScript
- TypeORM
- MySQL
- Docker

## TypeORM migrations

**Generating migrations**
After changing the entities, create a new migration with the script provided in the package.json. To run this command you need to type this in the terminal: `npm run migration:generate [migrations folder]`. In This project the path will is `./data/migration/[migration name]`.

**Manually run migrations**
To manually run a migration, just simply use the script provided in the package.json: `npm run migration:run`

## Docker

This project has been set up to be automatically deployed to my Linux server that runs with Docker. There are two Docker Compose files, one for development and one for production. The development enviroment consist of the NestJS API and a MySQL server. Keep in mind that the detection of file changes is slower in Docker. To make this all work we also need to set some enviroment variables, see `.env.example` for setting up the variables. If you run this in development you do not need to set the `MYSQL_HOST` variable, since the API uses localhost by default. All pending migrations will automatically execute after spinning up the database and api container.

You will also notice you need to setup some Firebase settings, since the API uses the Admin SDK from Firebase to verify user authentication.
