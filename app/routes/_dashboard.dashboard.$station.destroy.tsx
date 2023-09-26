import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteStation } from "~/models";

export const action: ActionFunction = async ({ params }) => {
  invariant(params.station, "Missing station param");
  await deleteStation(params.station);
  return redirect("/");
};
