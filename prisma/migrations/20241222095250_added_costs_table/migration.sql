-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('BENZINE', 'DIESEL', 'ETHANOL', 'LPG', 'CNG', 'ELEKTRISCH');

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "fuel_type" "FuelType" NOT NULL DEFAULT 'BENZINE',
    "vin" TEXT,
    "insurance" TEXT,
    "plate" TEXT,
    "make" TEXT,
    "model" TEXT,
    "year" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fillup" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "distance" INTEGER NOT NULL,
    "fuel" DOUBLE PRECISION NOT NULL,
    "full" BOOLEAN NOT NULL DEFAULT true,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "consumption" DOUBLE PRECISION NOT NULL,
    "volume_price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fillup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Costs" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "remind_only" BOOLEAN NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cost" DOUBLE PRECISION DEFAULT 0,
    "date" TIMESTAMP(3),
    "is_income" BOOLEAN NOT NULL,
    "repeat" TEXT NOT NULL,
    "notes" TEXT,
    "distance" INTEGER,
    "remind_distance" INTEGER,
    "remind_date" TIMESTAMP(3),
    "repeat_distance" INTEGER,
    "repeat_months" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Costs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Fillup_vehicle_id_idx" ON "Fillup"("vehicle_id");

-- CreateIndex
CREATE INDEX "Costs_vehicle_id_idx" ON "Costs"("vehicle_id");

-- AddForeignKey
ALTER TABLE "Fillup" ADD CONSTRAINT "Fillup_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Costs" ADD CONSTRAINT "Costs_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
