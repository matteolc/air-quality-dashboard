-- Create Extensions
CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
-- CreateTable
CREATE TABLE "stations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "lastContactedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "readings" (
    "time" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "stationId" TEXT NOT NULL
);
-- CreateIndex
CREATE UNIQUE INDEX "stations_name_key" ON "stations"("name");
-- CreateIndex
CREATE UNIQUE INDEX "stations_uuid_key" ON "stations"("uuid");
-- CreateIndex
CREATE UNIQUE INDEX "readings_time_key" ON "readings"("time");
-- AddForeignKey
ALTER TABLE "readings"
ADD CONSTRAINT "readings_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- Create Hypertable
SELECT create_hypertable('readings', 'time');
