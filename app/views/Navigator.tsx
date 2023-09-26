import { useParams } from "@remix-run/react";
import type { Station } from "~/models";
import { useMatchesData } from "~/utils";
import { Navigator as StationNavigator } from "~/components";

export const Navigator = () => {
  const { station: stationUUID } = useParams();
  const { stations } = useMatchesData("routes/_dashboard") as {
    stations: Station[];
  };
  const index = stations.findIndex(({ uuid }) => uuid === stationUUID);
  const station = stations[index];
  const nextStation = stations[index + 1] || stations[0];
  return (
    <StationNavigator
      current={station}
      next={nextStation}
      count={stations.length}
    />
  );
};
