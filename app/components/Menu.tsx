import { NavLink } from "@remix-run/react";
import { TimeInterval } from "~/models";
import { classNames } from "~/utils";

export const Menu = ({
  station,
  pathname,
  loading,
}: {
  station: string;
  pathname?: string;
  loading: boolean;
}) => {
  const Button = ({ name, to }: { name: string; to: string }) => {
    return (
      <NavLink
        to={to}
        prefetch="intent"
        className={({ isActive, isPending }) =>
          classNames(
            isActive
              ? "bg-cyan-950 text-cornflower-200  hover:bg-cyan-900"
              : "bg-cornflower-300 text-cyan-950 hover:bg-cornflower-600 hover:text-cornflower-200",
            "px-3 py-2 rounded-full cursor-pointer transition-colors duration-500 font-bold w-auto h-10",
            loading && pathname && decodeURIComponent(pathname) === to
              ? "animate-pulse"
              : "",
          )
        }
      >
        {name}
      </NavLink>
    );
  };

  return (
    <div className="flex gap-2">
      <Button name="CUR" to={["/dashboard", station, "cur"].join("/")} />
      {Object.entries(TimeInterval).map(([key, value]) => (
        <Button
          key={key}
          name={key[0]}
          to={["/dashboard", station, "hst", value].join("/")}
        />
      ))}
    </div>
  );
};
