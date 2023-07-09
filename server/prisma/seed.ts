import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  const currencies = [
    { currency: "$", exchangeRate: 1.0, currencyCode: "USD" },
    { currency: "€", exchangeRate: 1.18, currencyCode: "EUR" },
    { currency: "£", exchangeRate: 1.38, currencyCode: "GBP" },
    { currency: "¥", exchangeRate: 0.0091, currencyCode: "JPY" },
  ];

  for (const currency of currencies) {
    await prisma.currencies.create({
      data: currency,
    });
  }
}

seed();
