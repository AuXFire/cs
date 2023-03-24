-- CreateTable
CREATE TABLE "SteamUser" (
    "id" SERIAL NOT NULL,
    "steamId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,

    CONSTRAINT "SteamUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SteamUser_steamId_key" ON "SteamUser"("steamId");
