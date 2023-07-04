import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  const currencies = [
    { currency: "$", exchangeRate: 1.0 },
    { currency: "€", exchangeRate: 1.18 },
    { currency: "£", exchangeRate: 1.38 },
    { currency: "¥", exchangeRate: 0.0091 },
  ];

  for (const currency of currencies) {
    await prisma.currencies.create({
      data: currency,
    });
  }
}

seed()
