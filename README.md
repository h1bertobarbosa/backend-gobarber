# gobarber-backend
docker run --name database-pg -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:12.2-
docker run --name mongodb -p 27017:27017 -d -t mongo

Criar miration
npx typeorm migration:create -n CreateUsers
Rodar
npm run typeorm migration:run
Reverter
npm run typeorm migration:revert
