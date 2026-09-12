npm i


npx dotenv-cli -e ../.env -- prisma db push
npx dotenv-cli -e ../.env -- prisma generate

npm run dev

docker compose up -d --build     