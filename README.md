npm i
npm run dev

npx dotenv-cli -e ../.env -- prisma db push
npx dotenv-cli -e ../.env -- prisma generate