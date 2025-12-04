// Prisma configuration is typically handled in schema.prisma file
// This config file is not needed for standard Prisma setup
export default {
  schema: "prisma/schema.prisma",
  
  migrations: {
    path: "prisma/migrations",
    seed: "ts-node ./prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
