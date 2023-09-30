import { useEffect, useState } from "react";
import type { SocketData } from "socket";

export function useSensorsData() {
  const [data, setData] = useState<SocketData | undefined>();
  const [temperature, setTemperature] = useState<number | undefined>();
  const [humidity, setHumidity] = useState<number | undefined>();
  const [pressure, setPressure] = useState<number | undefined>();
  const [BVOC, setBVOC] = useState<number | undefined>();
  const [IAQ, setIAQ] = useState<number | undefined>();
  const [staticIAQ, setStaticIAQ] = useState<number | undefined>();
  const [CO2, setCO2] = useState<number | undefined>();
  const [date, setDate] = useState<Date | undefined>();
  const [IAQAccuracy, setIAQAccuracy] = useState<0 | 1 | 2 | 3 | undefined>();
  const [BVOCAccuracy, setBVOCAccuracy] = useState<0 | 1 | 2 | 3 | undefined>();
  const [CO2Accuracy, setCO2Accuracy] = useState<0 | 1 | 2 | 3 | undefined>();
  const [isStable, setIsStable] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [vbat, setVbat] = useState<number | undefined>();

  const [UUID, setUUID] = useState<string | undefined>();

  const resetData = () => {
    setTemperature(undefined);
    setPressure(undefined);
    setHumidity(undefined);
    setBVOC(undefined);
    setIAQ(undefined);
    setStaticIAQ(undefined);
    setCO2(undefined);
    setDate(undefined);
    setIsReady(false);
    setIsStable(false);
    setIAQAccuracy(undefined);
    setBVOCAccuracy(undefined);
    setCO2Accuracy(undefined);
    setVbat(undefined);
  };

  useEffect(() => {
    if (data === undefined) return;

    const {
      uuid,
      epoch,
      temperature,
      pressure,
      humidity,
      bvoc,
      iaq,
      eco2,
      iaqAccuracy,
      bvocAccuracy,
      co2Accuracy,
      runInStatus,
      stabStatus,
      staticIaq,
      vbat,
    } = data;
    setDate(new Date(epoch * 1000));
    setTemperature(Number(temperature.toFixed(1)));
    setPressure(Number((pressure / 100).toFixed(0)));
    setHumidity(Number(humidity.toFixed(1)));
    setBVOC(Number(bvoc && bvoc.toFixed(1)));
    setIAQ(Number(iaq.toFixed(0)));
    setStaticIAQ(Number(staticIaq.toFixed(0)));
    setCO2(Number(eco2.toFixed(0)));
    setIAQAccuracy(iaqAccuracy);
    setBVOCAccuracy(bvocAccuracy);
    setCO2Accuracy(co2Accuracy);
    setIsReady(runInStatus === 1);
    setIsStable(stabStatus === 1);
    setVbat(vbat);

    setUUID(uuid);
  }, [data]);

  return {
    temperature,
    humidity,
    pressure,
    BVOC,
    IAQ,
    staticIAQ,
    IAQAccuracy,
    BVOCAccuracy,
    CO2Accuracy,
    CO2,
    isReady,
    isStable,
    vbat,
    date,
    setData,
    resetData,
    UUID,
  };
}
