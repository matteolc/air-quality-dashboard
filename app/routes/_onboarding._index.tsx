import { Link } from "@remix-run/react";
import { classNames } from "~/utils";
import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import { useSocket } from "~/context";
import { Confetti } from "~/components";
import type { SocketBootData } from "socket";
import { type LoaderFunction, json, redirect } from "@remix-run/node";
import { getFirstStation } from "~/models/stations";

enum OnboardingStatus {
  COMPLETE,
  ONGOING,
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const station = await getFirstStation();
  if (station) throw redirect(["/dashboard", station.uuid, "cur"].join("/"));
  return json({});
};

export default function Index() {
  const [status, setStatus] = useState<OnboardingStatus>(
    OnboardingStatus.ONGOING,
  );
  const [stationUUID, setStationUUID] = useState<string | undefined>();
  const socket = useSocket() as Socket;
  const [confetti, setConfetti] = useState<string | undefined>();

  useEffect(() => {
    if (!socket) return;

    socket.on("boot", ({ uuid }: SocketBootData) => {
      setStationUUID(uuid);
      setStatus(OnboardingStatus.COMPLETE);
      setConfetti(String(Math.random()));
    });
  }, [socket]);

  return (
    <div className="bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <div className="dark:bg-cyan-950 p-4 rounded-md ">
            <h2 className="mt-2 text-6xl font-bold tracking-tight text-cyan-950 sm:text-6xl">
              {status === OnboardingStatus.ONGOING ? "Welcome" : "Congrats!"}
            </h2>
            <p className="mt-6 text-2xl leading-8 text-cyan-900 w-[32rem]">
              {status === OnboardingStatus.ONGOING
                ? "It looks like you haven't registered any stations yet."
                : "Station has been provisioned."}
            </p>
            {status === OnboardingStatus.ONGOING && (
              <nav aria-label="Progress" className="mt-8">
                <ol className="overflow-hidden">
                  <li className="relative">
                    <div className="group relative flex items-start w-[32rem]">
                      <span className="flex h-12 items-center">
                        <span
                          className={classNames(
                            "relative z-10 flex h-8 w-8 items-center justify-center rounded-full",
                            "animate-spin border-4 border-cyan-950/30  border-b-cyan-950",
                          )}
                        >
                          <span
                            className={classNames(
                              "animate-ping bg-cyan-950",
                              "h-2 w-2 rounded-full ",
                            )}
                          />
                        </span>
                      </span>
                      <span className="ml-4 flex min-w-0 flex-col">
                        <span className="text-lg font-medium text-cyan-800">
                          Provision your station
                        </span>
                        <span className="text-sm text-cyan-100">
                          Power-up your station and connect to the
                          Air_Quality_Station Wi-Fi network. A new browser
                          window will open, ", "follow the instructios to
                          register your station in the browser.
                        </span>
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            )}
          </div>
          <div className="mt-10 grid grid-cols-2 grid-rows-1 items-baseline justify-between ml-4">
            <div
              className={classNames(
                status === OnboardingStatus.COMPLETE ? "visible" : "invisible",
                "transition-all duration-75",
              )}
            >
              <Link
                to={["/dashboard", stationUUID, "cur"].join("/")}
                prefetch="intent"
                className={classNames(
                  "text-md text-white",
                  "group relative inline-flex gap-x-1.5 overflow-hidden",
                  "rounded-md bg-cyan-800 px-3 pb-2 pt-2 font-semibold shadow-sm",
                  "transition-all duration-300 ease-out",
                  "hover:bg-gradient-to-r hover:from-cyan-800 hover:to-cornflower-600 hover:ring-0",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800",
                )}
              >
                <div className="flex-shrink-0 self-end overflow-hidden ">
                  <div className="inline-flex overflow-hidden ">
                    <span
                      className={classNames(
                        "ease absolute right-0 -mt-12 h-32 w-8",
                        "translate-x-12 rotate-12 transform transition-all duration-500",
                        "bg-white opacity-10 group-hover:-translate-x-60",
                      )}
                    ></span>
                    Take me to the dasbhoard
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Confetti confetti={confetti} />
    </div>
  );
}
