<h1>Ecofin - API v1 - Nodejs + Typeorm + PostgreSQL</h1>
<p>criar migration: yarn typeorm migration:create src/database/migrations/nome-da-migration</p>
<p> executar as migrations: yarn typeorm -- migration:run -d src/database/dataSource.ts</p>
<p> reverter migration: yarn typeorm -- migration:revert -d src/database/dataSource.ts</p>