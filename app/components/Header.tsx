import { NetworkIcon } from "~/icons";
import { Menu } from "~/views/Menu";
import { Clock } from "./Clock";

export const Header = ({ date, count }: { date?: Date; count: number }) => {
  return (
    <div className="grid grid-flow-col grid-cols-3 grid-rows-1 mb-12">
      <div className="grid justify-items-start">
        <Menu />
      </div>
      <div className="grid grid-cols grid-rows-1 grid-cols-2 text-cyan-950">
        <div className="flex justify-end mr-1 -mt-2 scale-70">
          <NetworkIcon />
        </div>
        <div className="text-3xl font-bold">{count}</div>
      </div>
      <div className="grid min-w-full justify-end">
        <Clock date={date} />
      </div>
    </div>
  );
};
