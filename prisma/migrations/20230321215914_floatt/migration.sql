-- AlterTable
ALTER TABLE "Bet" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "SteamUser" ALTER COLUMN "coins" SET DEFAULT 0,
ALTER COLUMN "coins" SET DATA TYPE DOUBLE PRECISION;