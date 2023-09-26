import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteStation, truncateReadings } from "~/models";

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.station, "Missing station param");
  const formData = await request.formData();
  const readingType = formData.get("type") as string | null;
  const stationId = formData.get("stationId") as string | null;
  console.dir({ readingType, stationId });
  if (readingType === null || stationId === null) {
    await deleteStation(params.station);
  } else {
    await truncateReadings({ stationId, type: readingType });
  }
  return redirect("/");
};
