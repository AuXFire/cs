/*
  Warnings:

  - Added the required column `personaName` to the `SteamUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realName` to the `SteamUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SteamUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SteamUser" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "personaName" TEXT NOT NULL,
ADD COLUMN     "realName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
