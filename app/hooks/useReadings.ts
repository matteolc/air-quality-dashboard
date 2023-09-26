import type { SocketData } from "socket";
import { MeterUnit, MeterType } from "~/components/Meter";
import { createReading, getLastReading, getStationByUUID } from "~/models";

export const DEFAULT_DB_SAVE_FREQUENCY = 5 * 60;

export async function useReadings({
  data: { uuid, temperature, pressure, humidity, epoch, iaq, eco2, bvoc },
  frequency,
}: {
  data: SocketData;
  frequency?: number;
}) {
  const station = await getStationByUUID(uuid);
  const useFrequency = frequency || DEFAULT_DB_SAVE_FREQUENCY;

  if (!station) return;

  const stationId = station.id;
  const lastReading = await getLastReading({ stationId });
  const time = new Date(epoch * 1000);
  let timeDiff = useFrequency + 1;

  if (lastReading) {
    timeDiff = Math.abs(lastReading.time.getTime() - time.getTime()) / 1000;
    console.dir({ lastReading, time, timeDiff });
  }

  if (timeDiff < useFrequency) return;

  const payload = {
    time,
    stationId,
  };

  return await Promise.all([
    createReading({
      value: temperature,
      type: MeterType.TEMPERATURE.toLowerCase(),
      unit: MeterUnit.CELSIUS,
      ...payload,
    }),
    createReading({
      value: pressure / 100,
      type: MeterType.PRESSURE.toLowerCase(),
      unit: MeterUnit.PASCAL,
      ...payload,
    }),
    createReading({
      value: humidity,
      type: MeterType.HUMIDITY.toLowerCase(),
      unit: MeterUnit.PERCENT,
      ...payload,
    }),
    createReading({
      value: iaq,
      type: MeterType.IAQ.toLowerCase(),
      unit: MeterUnit.NONE,
      ...payload,
    }),
    createReading({
      value: eco2,
      type: MeterType.CO2.toLowerCase(),
      unit: MeterUnit.PPM,
      ...payload,
    }),
    createReading({
      value: bvoc,
      type: MeterType.BVOC.toLowerCase(),
      unit: MeterUnit.PPM,
      ...payload,
    }),
  ]);
}
