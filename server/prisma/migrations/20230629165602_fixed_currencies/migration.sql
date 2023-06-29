/*
  Warnings:

  - You are about to drop the column `coefficien_to_reference` on the `currencies` table. All the data in the column will be lost.
  - Added the required column `exchangeRate` to the `currencies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "currencies" DROP COLUMN "coefficien_to_reference",
ADD COLUMN     "exchangeRate" DOUBLE PRECISION NOT NULL;
