# criar migration: yarn typeorm migration:create src/database/migrations/nome-da-migration
# executar as migrations: yarn typeorm -- migration:run -d src/database/dataSource.ts
# reverter migration: yarn typeorm -- migration:revert -d src/database/dataSource.ts