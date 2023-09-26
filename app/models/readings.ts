import {
  type stations as Station,
  type readings as Reading,
} from "@prisma/client";
import { prisma } from "~/db.server";

export type { readings as Reading } from "@prisma/client";

export enum TimeInterval {
  HOUR = "1 hour",
  DAY = "1 day",
  WEEK = "1 week",
  MONTH = "1 month",
  YEAR = "1 year",
}

export enum Statistic {
  MAX = "max(value)",
  MIN = "min(value)",
  AVG = "avg(value)",
  P95 = "percentile_disc(0.95) WITHIN GROUP (ORDER BY value)",
  P90 = "percentile_disc(0.90) WITHIN GROUP (ORDER BY value)",
  P75 = "percentile_disc(0.75) WITHIN GROUP (ORDER BY value)",
  P50 = "percentile_disc(0.50) WITHIN GROUP (ORDER BY value)",
}

export async function getReadingTimeseries({
  stationId,
  interval = TimeInterval.HOUR,
  value = Statistic.MAX,
}: {
  stationId: Station["id"];
  interval?: TimeInterval;
  value?: Statistic;
}) {
  const mapResolutionToTimeWindow = {
    [TimeInterval.HOUR]: TimeInterval.DAY,
    [TimeInterval.DAY]: TimeInterval.WEEK,
    [TimeInterval.WEEK]: TimeInterval.MONTH,
    [TimeInterval.MONTH]: TimeInterval.YEAR,
  };

  return await prisma.$queryRawUnsafe(
    `
SELECT time_bucket('${interval}', time) as t,
  ${value} as value,
  type
FROM readings
WHERE "stationId" = '${stationId}'
AND DATE(time) BETWEEN NOW() - INTERVAL '${
      Object(mapResolutionToTimeWindow)[interval]
    }' AND NOW()
GROUP BY t, type
ORDER BY t DESC`,
  );
}

export async function getReadingCount({
  stationId,
  interval = TimeInterval.MONTH,
}: {
  stationId: Station["id"];
  interval?: TimeInterval;
}) {
  return await prisma.$queryRawUnsafe(
    `
SELECT count(*) as count,
type
FROM readings
WHERE "stationId" = '${stationId}'
AND DATE(time) BETWEEN NOW() - INTERVAL '${interval}' AND NOW()
GROUP BY type`,
  );
}

export async function getReadingStats({
  stationId,
  interval = TimeInterval.DAY,
}: {
  stationId: Station["id"];
  interval?: TimeInterval;
}) {
  return await prisma.$queryRawUnsafe(
    `
SELECT time_bucket('${interval}', time) as t,
  ${Statistic.MAX} as max,
  ${Statistic.MIN} as min,
  ${Statistic.AVG} as avg,
  ${Statistic.P95} as p95,
  ${Statistic.P90} as p90,
  ${Statistic.P75} as p75,
  ${Statistic.P50} as p50,
  type
FROM readings
WHERE "stationId" = '${stationId}'
AND DATE(time) BETWEEN NOW() - INTERVAL '1 year' AND NOW()
GROUP BY t, type
ORDER BY t DESC`,
  );
}

export async function getLastReading({
  stationId,
}: {
  stationId: Station["id"];
}) {
  return prisma.readings.findFirst({
    select: { time: true },
    where: { stationId },
    orderBy: { time: "desc" },
  });
}

export async function createReading({
  time,
  value,
  type,
  unit,
  stationId,
}: Pick<Reading, "value" | "type" | "unit" | "time"> & {
  stationId: Station["id"];
}) {
  return prisma.readings.create({
    data: {
      value,
      type,
      unit,
      time,
      stationId,
    },
  });
}
