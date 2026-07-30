// бля сори что полез в гемини но этот ебаный призм принципиально не хочет читать .env.local видите ли подавай ему .env

import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Насильно загружаем .env на самом старте выполнения файла
config({ path: ".env.local" }); 

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Теперь process.env гарантированно заполнен, и хардкод не нужен
    url: process.env.DATABASE_URL, 
  },
});
