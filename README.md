<h1>Ecofin - API v1 - Nodejs + Typeorm + PostgreSQL</h1>
<span>-- Readme em construção --</span>
<br>
<br>
<h2>Com a api do ecofin é possível realizar o gerenciamento de finanças pessoais</h2>
<ul>
  <li>Criar planejamento mensal a partir de uma data de início e número de meses</li>
  <li>Lançar compras parceladas</li>
</ul>
<span>criar migration: yarn typeorm migration:create src/database/migrations/nome-da-migration</span>
<span> executar as migrations: yarn typeorm -- migration:run -d src/database/dataSource.ts</span>
<span> reverter migration: yarn typeorm -- migration:revert -d src/database/dataSource.ts</span>
