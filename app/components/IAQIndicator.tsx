import { IndicatorIcon } from "~/icons";
import { classNames } from "~/utils";

export const IAQIndicator = ({
  value,
  max,
}: {
  value?: number;
  max: number;
}) => {
  // 672 = h-24 * 7
  // 82 = px-12 (layout) + mb-12 (header)
  const indicatorY = (max - (value || 0)) * (672 / max) + 82;
  return (
    <>
      <div
        style={{ top: indicatorY }}
        className="absolute transition-all duration-100"
      >
        {value && <IndicatorIcon className="text-cyan-950 ml-2" />}
      </div>
      <div
        className={classNames(
          value ? "" : "animate-pulse",
          "grid grid-flow-row grid-cols-1",
        )}
      >
        <div className={"w-4 h-24 bg-amber-950 rounded-t-lg"}></div>
        <div className={"w-4 h-24 bg-purple-700"}></div>
        <div className={"w-4 h-24 bg-red-600"}></div>
        <div className={"w-4 h-24 bg-orange-600"}></div>
        <div className={"w-4 h-24 bg-yellow-400"}></div>
        <div className={"w-4 h-24 bg-green-600"}></div>
        <div className={"w-4 rounded-b-lg h-24 bg-green-300"}></div>
      </div>
    </>
  );
};
