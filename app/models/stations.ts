import type { stations as Station } from "@prisma/client";
import { prisma } from "~/db.server";

export type { stations as Station } from "@prisma/client";

export async function getStationByUUID(uuid: Station["uuid"]) {
  return prisma.stations.findUnique({ where: { uuid } });
}

export async function deleteStation(uuid: Station["uuid"]) {
  return await prisma.stations.delete({
    where: {
      uuid,
    },
    include: {
      readings: true,
    },
  });
}

export async function getStationCount() {
  return prisma.stations.count;
}

export async function getFirstStation() {
  return prisma.stations.findFirst();
}

export async function getAllStations() {
  return prisma.stations.findMany();
}

export async function updateStationLastContactedAt(uuid: Station["uuid"]) {
  const lastContactedAt = new Date();
  return prisma.stations.update({
    where: {
      uuid,
    },
    data: {
      lastContactedAt,
    },
  });
}

export async function createStation(uuid: Station["uuid"], name: string) {
  const lastContactedAt = new Date();
  return prisma.stations.create({
    data: {
      name,
      uuid,
      lastContactedAt,
    },
  });
}
