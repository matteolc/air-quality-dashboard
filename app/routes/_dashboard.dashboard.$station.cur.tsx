import type { Socket } from "socket.io-client";
import { useSocket } from "~/context";
import {
  Header,
  IAQIndicator,
  Meter,
  MeterType,
  MeterUnit,
  MeterVariation,
  Confetti,
} from "~/components";
import { Navigator } from "~/views/Navigator";
import { useSensorsData } from "~/hooks";
import { useEffect, useState } from "react";
import type { SocketData } from "socket";
import { useParams } from "@remix-run/react";
import { classNames, timeAgo, useMatchesData } from "~/utils";
import type { Station } from "~/models";
import {
  TemperatureIcon,
  HumidityIcon,
  Co2Icon,
  AqiIcon,
  TvocIcon,
} from "~/icons";
import { IconForPressure } from "~/components/Meter/utils";
import { BatteryIndicator } from "~/components/BatteryIndicator";

export default function Index() {
  const { setData, resetData, date, UUID, ...data } = useSensorsData();
  const { station } = useParams();
  const { stations } = useMatchesData("routes/_dashboard") as {
    stations: Station[];
  };
  const [waiting, setWaiting] = useState(true);
  const [confetti, setConfetti] = useState<string | undefined>();
  const socket = useSocket() as Socket;

  useEffect(() => {
    if (UUID !== station) resetData();
  }, [UUID, station, resetData]);

  useEffect(() => {
    if (!socket) return;

    const listener = (data: SocketData) => {
      if (data.uuid === station) {
        setData(data);
        waiting && setWaiting(false);
      }
    };

    const maybeConfetti = (data: SocketData) => {
      if (!stations.find(({ uuid }) => uuid === data.uuid)) {
        setConfetti(String(Math.random()));
      }
    };

    socket.on("msg", listener);
    socket.on("boot", maybeConfetti);

    return () => {
      socket.off("msg", listener);
      socket.off("boot", maybeConfetti);
    };
  }, [socket, station, waiting, setData, stations]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (date && timeAgo(date, "minute") >= 1) {
        setWaiting(true);
      }
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, [station, date]);

  const {
    temperature,
    humidity,
    pressure,
    BVOC,
    IAQ,
    CO2,
    IAQAccuracy,
    isReady,
    isStable,
    vbat,
  } = data;

  return (
    <>
      <Header date={date} count={stations.length} />

      <div className="grid grid-flow-col grid-cols-3 gap-4">
        <div
          className={classNames(
            waiting ? "animate-pulse" : "",
            "grid grid-cols-1 grid-rows-3",
          )}
        >
          <Meter
            maximumFractionDigits={0}
            unit={MeterUnit.NONE}
            type={MeterType.IAQ}
            value={IAQ}
            icon={<AqiIcon />}
            isReady={isReady}
            isStable={isStable}
            accuracy={IAQAccuracy}
          />
          <Meter
            maximumFractionDigits={1}
            type={MeterType.BVOC}
            unit={MeterUnit.PPM}
            icon={<TvocIcon />}
            value={BVOC}
            isReady={isReady}
            isStable={isStable}
            showColorCode={true}
          />
          <Meter
            maximumFractionDigits={0}
            type={MeterType.CO2}
            unit={MeterUnit.PPM}
            icon={<Co2Icon />}
            value={CO2}
            isReady={isReady}
            isStable={isStable}
            showColorCode={true}
          />
        </div>
        <div className="ml-8 flex flex-row">
          <IAQIndicator value={IAQ} max={500} />
          <Navigator />
        </div>
        <div
          className={classNames(
            waiting ? "animate-pulse" : "",
            "grid justify-items-end grid-cols-1 grid-rows-3",
          )}
        >
          <Meter
            variation={MeterVariation.LIGHT}
            showName={false}
            type={MeterType.TEMPERATURE}
            unit={MeterUnit.CELSIUS}
            value={temperature}
            icon={<TemperatureIcon />}
          />
          <Meter
            variation={MeterVariation.LIGHT}
            showName={false}
            type={MeterType.HUMIDITY}
            unit={MeterUnit.PERCENT}
            value={humidity}
            maximumFractionDigits={0}
            icon={<HumidityIcon />}
          />
          <Meter
            variation={MeterVariation.LIGHT}
            showName={false}
            type={MeterType.PRESSURE}
            unit={MeterUnit.PASCAL}
            value={pressure}
            maximumFractionDigits={0}
            icon={<IconForPressure value={pressure} />}
          />
        </div>
      </div>

      <div className="flex justify-end -mr-20 mt-4">
        <BatteryIndicator value={vbat} />
      </div>
      <Confetti confetti={confetti} />
    </>
  );
}
