import { redirect, type LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getStationByUUID } from "~/models";
import { useRevalidateOnFocus } from "~/utils";

// redirect to onboarding if there are no stations
export const loader: LoaderFunction = async ({ params }) => {
  const station = await getStationByUUID(params.station!);
  if (!station) throw redirect("/");
  return { station };
};

export default function Index() {
  useRevalidateOnFocus({ enabled: true });

  return <Outlet />;
}
