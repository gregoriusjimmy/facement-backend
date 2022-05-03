/*
  Warnings:

  - You are about to drop the column `faceData` on the `Account` table. All the data in the column will be lost.
  - Added the required column `photo` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "faceData",
ADD COLUMN     "photo" TEXT NOT NULL;
