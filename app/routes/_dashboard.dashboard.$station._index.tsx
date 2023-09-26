import { redirect, type LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import { TimeInterval, getReadingCount, getStationByUUID } from "~/models";
import { Navigator } from "~/views/Navigator";
import { CloseIcon } from "~/icons";

export const loader: LoaderFunction = async ({ params }) => {
  const station = await getStationByUUID(params.station!);
  if (!station) throw redirect("/");

  const [yearlyCounts, monthlyCounts] = await Promise.all([
    getReadingCount({ stationId: station.id, interval: TimeInterval.YEAR }),
    getReadingCount({ stationId: station.id }),
  ]);
  return { yearlyCounts, monthlyCounts, station };
};

export default function Index() {
  const { yearlyCounts, monthlyCounts, station } = useLoaderData();
  const navigation = useNavigation();
  return (
    <div className="grid grid-flow-col grid-cols-3 gap-12">
      <div className="mt-8 flow-root">
        <div className="text-cyan-950 text-right flex justify-end -mr-2">
          <Link to={"cur"} prefetch="intent">
            <CloseIcon />
          </Link>
        </div>
        <div className="text-4xl font-bold mb-2 text-cyan-950">
          Station Info
        </div>
        <div className="overflow-hidden shadow ring-1 ring-cyan-950 ring-opacity-5 sm:rounded-lg">
          <div className="bg-cyan-950">
            <dl className="divide-y divide-cyan-700">
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-cornflower-200">
                  Name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-cornflower-500 sm:col-span-2 sm:mt-0">
                  {station.name}
                </dd>
              </div>
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-cornflower-200">
                  Location
                </dt>
                <dd className="mt-1 text-sm leading-6 text-cornflower-500 sm:col-span-2 sm:mt-0">
                  Location
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <Form
          action="destroy"
          method="post"
          onSubmit={(event) => {
            const response = confirm(
              "Please confirm you want to delete this record.",
            );
            if (!response) {
              event.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="my-4 uppercase rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            {navigation.state === "submitting"
              ? "Deleting..."
              : "Delete Station"}
          </button>
        </Form>
        <div className="text-4xl font-bold mb-2 mt-4 text-cyan-950">
          Data Usage
        </div>
        <div className="-mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-cyan-950 ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-cyan-200">
                <thead className="bg-cornflower-500">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-cyan-950 sm:pl-6"
                    >
                      Sensor
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-cyan-950"
                    >
                      Monthly
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-cyan-950"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyan-900 bg-cyan-950">
                  {monthlyCounts.map((count: any) => (
                    <tr key={count.type}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-cornflower-200 sm:pl-6">
                        {count.type.toUpperCase()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-cornflower-500">
                        {count.count}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-cornflower-500">
                        {
                          yearlyCounts.find(
                            (cnt: any) => cnt.type === count.type,
                          )?.count
                        }
                      </td>
                      <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Form
                          action="destroy"
                          method="post"
                          onSubmit={(event) => {
                            const response = confirm(
                              "Please confirm you want to delete this record.",
                            );
                            if (!response) {
                              event.preventDefault();
                            }
                          }}
                        >
                          <input type="hidden" value={count.type}></input>
                          <button
                            type="button"
                            className="uppercase rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                          >
                            Delete
                          </button>
                        </Form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[88px] ml-8">
        <Navigator />
      </div>
    </div>
  );
}
