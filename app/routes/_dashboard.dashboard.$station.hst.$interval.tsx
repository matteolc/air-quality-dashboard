import { redirect, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Header,
  Meter,
  MeterType,
  MeterUnit,
  MeterVariation,
} from "~/components";
import { Navigator } from "~/views/Navigator";
import {
  type TimeInterval,
  getReadingStats,
  getStationByUUID,
  type Station,
  Statistic,
} from "~/models";
import { useMatchesData } from "~/utils";
import {
  TemperatureIcon,
  HumidityIcon,
  Co2Icon,
  AqiIcon,
  TvocIcon,
} from "~/icons";
import { IconForPressure } from "~/components/Meter/utils";

export const loader: LoaderFunction = async ({ params }) => {
  const station = await getStationByUUID(params.station!);
  if (!station) throw redirect("/");

  const stats = await getReadingStats({
    stationId: station.id,
    interval: params.interval! as TimeInterval,
  });

  return { stats };
};

export default function Index() {
  const { stats } = useLoaderData();
  const { stations } = useMatchesData("routes/_dashboard") as {
    stations: Station[];
  };

  const getLatestStatFor = (type: string) =>
    stats.filter((stat: any) => stat.type === type)[0];

  const getLatestStats = (type: string) =>
    Object.keys(Statistic).reduce((acc: { [key: string]: number }, key) => {
      acc[key.toLowerCase()] = getLatestStatFor(type)?.[key.toLowerCase()];
      return acc;
    }, {});

  return (
    <>
      <Header
        date={
          new Date(getLatestStatFor(MeterType.TEMPERATURE.toLowerCase())?.t)
        }
        count={stations.length}
      />
      <div className="grid grid-flow-col grid-cols-3 gap-4">
        <div className="grid grid-cols-1 grid-rows-3 gap-2">
          <Meter
            value={getLatestStats(MeterType.IAQ.toLowerCase())?.avg}
            maximumFractionDigits={0}
            unit={MeterUnit.NONE}
            type={MeterType.IAQ}
            icon={<AqiIcon />}
            {...getLatestStats(MeterType.IAQ.toLowerCase())}
            showColorCode={true}
          />
          <Meter
            value={getLatestStats(MeterType.BVOC.toLowerCase())?.avg}
            maximumFractionDigits={1}
            type={MeterType.BVOC}
            unit={MeterUnit.PPM}
            icon={<TvocIcon />}
            {...getLatestStats(MeterType.BVOC.toLowerCase())}
            showColorCode={true}
          />
          <Meter
            value={getLatestStats(MeterType.CO2.toLowerCase())?.avg}
            maximumFractionDigits={0}
            type={MeterType.CO2}
            unit={MeterUnit.PPM}
            icon={<Co2Icon />}
            {...getLatestStats(MeterType.CO2.toLowerCase())}
            showColorCode={true}
          />
        </div>
        <div className="ml-8 flex flex-row">
          <Navigator />
        </div>

        <div className="grid justify-items-end grid-cols-1 grid-rows-3">
          <Meter
            variation={MeterVariation.LIGHT}
            showName={false}
            type={MeterType.TEMPERATURE}
            unit={MeterUnit.CELSIUS}
            icon={<TemperatureIcon />}
            {...getLatestStats(MeterType.TEMPERATURE.toLowerCase())}
          />
          <Meter
            variation={MeterVariation.LIGHT}
            showName={false}
            type={MeterType.HUMIDITY}
            unit={MeterUnit.PERCENT}
            maximumFractionDigits={0}
            icon={<HumidityIcon />}
            {...getLatestStats(MeterType.HUMIDITY.toLowerCase())}
          />
          <Meter
            variation={MeterVariation.LIGHT}
            showName={false}
            type={MeterType.PRESSURE}
            unit={MeterUnit.PASCAL}
            maximumFractionDigits={0}
            icon={
              <IconForPressure
                value={getLatestStats(MeterType.PRESSURE.toLowerCase())?.avg}
              />
            }
            {...getLatestStats(MeterType.PRESSURE.toLowerCase())}
          />
        </div>
      </div>
    </>
  );
}
