import { Link } from "@remix-run/react";
import { NextIcon } from "~/icons";
import type { Station } from "~/models";
import { classNames, formatRelativeTime, timeAgo } from "~/utils";

export const Navigator = ({
  current,
  next,
  count,
}: {
  current: Station;
  next: Station;
  count: number;
}) => {
  return (
    <div className="text-center min-w-full mt-56 ml-20">
      <span
        className={classNames(
          "w-80 ring-offset-4 ring-8 ring-cyan-950 ring-offset-cornflower-400",
          "text-left inline-block pl-8 py-8",
          "rounded-full bg-cornflower-400 text-cyan-950",
        )}
      >
        <div className="flex flex-row justify-between min-w-full">
          <div className="ml-2">
            <Link to={["/dashboard", current.uuid].join("/")} prefetch="intent">
              <span className="text-4xl text-ellipsis underline hover:text-cornflower-300">
                {current.name}
              </span>
            </Link>
            <br />
            <span className="text-xl">{"location"}</span>
            <br />
            <span className="text-sm text-cyan-600">
              Connected{" "}
              {formatRelativeTime(
                timeAgo(current.lastContactedAt, "day"),
                "day",
              )}
            </span>
          </div>
          {count > 1 && (
            <Link
              className={classNames(
                "rounded-full bg-cyan-950 text-cornflower-200 hover:text-cyan-950 w-16 h-16 pl-2 pt-2 mt-4 cursor-pointer",
                "hover:bg-cornflower-300 transition-colors duration-500",
                "hover:ring-2 hover:ring-offset-2 hover:ring-cyan-950 hover:ring-offset-cyan-950",
              )}
              to={["/dashboard", next.uuid, "cur"].join("/")}
              prefetch="intent"
            >
              <NextIcon />
            </Link>
          )}
        </div>
      </span>
    </div>
  );
};
