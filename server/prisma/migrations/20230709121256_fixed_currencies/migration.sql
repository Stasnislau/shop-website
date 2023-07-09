/*
  Warnings:

  - Added the required column `currencyCode` to the `currencies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "currencies" ADD COLUMN     "currencyCode" TEXT NOT NULL;
