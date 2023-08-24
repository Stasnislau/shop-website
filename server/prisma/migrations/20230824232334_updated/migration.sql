/*
  Warnings:

  - Added the required column `chosenColor` to the `cart_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chosenSize` to the `cart_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_item" ADD COLUMN     "chosenColor" TEXT NOT NULL,
ADD COLUMN     "chosenSize" TEXT NOT NULL;
