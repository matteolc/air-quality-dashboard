import {
  redirect,
  type LoaderFunction,
  type V2_MetaFunction,
} from "@remix-run/node";
import { Outlet, useNavigation } from "@remix-run/react";
import { getAllStations } from "~/models";
import { classNames } from "~/utils";

export const meta: V2_MetaFunction = () => [
  {
    title: "Air Quality Dashboard",
  },
];

// redirect to onboarding if there are no stations
export const loader: LoaderFunction = async ({ request, params }) => {
  const stations = await getAllStations();
  if (stations.length === 0) throw redirect("/");

  return { stations };
};

export default function Index() {
  const navigation = useNavigation();
  return (
    <div>
      <div
        className={classNames(
          navigation.state === "loading" ? "fixed" : "hidden",
          "top-0 left-0 w-full h-full bg-cornflower-700/30 text-center",
        )}
      ></div>
      <Outlet />
    </div>
  );
}
