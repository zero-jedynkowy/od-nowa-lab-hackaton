docker compose up -d --build    

cd app
npm i
npx dotenv-cli -e ../.env -- prisma db push
npx dotenv-cli -e ../.env -- prisma generate
npm run dev