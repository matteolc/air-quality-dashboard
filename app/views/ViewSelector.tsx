import { useNavigation, useParams } from "@remix-run/react";
import { ViewSelector as StationViewSelector } from "~/components";
export const ViewSelector = () => {
  const { station } = useParams();
  const { state, location } = useNavigation();

  if (station === undefined) return null;

  return (
    <StationViewSelector
      station={station}
      loading={state === "loading"}
      pathname={location?.pathname}
    />
  );
};
