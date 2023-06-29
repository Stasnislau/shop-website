-- CreateTable
CREATE TABLE "currencies" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "coefficien_to_reference" INTEGER NOT NULL,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);
