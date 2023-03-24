/*
  Warnings:

  - The primary key for the `SteamUser` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SteamUser" DROP CONSTRAINT "SteamUser_pkey",
ADD COLUMN     "coins" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SteamUser_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SteamUser_id_seq";

-- CreateTable
CREATE TABLE "Bet" (
    "id" TEXT NOT NULL,
    "steamUserId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginLink" (
    "id" TEXT NOT NULL,
    "steamUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoginLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_steamUserId_fkey" FOREIGN KEY ("steamUserId") REFERENCES "SteamUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
