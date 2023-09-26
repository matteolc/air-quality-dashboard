import { classNames, isDefined } from "~/utils";

export const BatteryIndicator = ({
  value,
  max = 3.8,
  min = 3.0,
}: {
  value?: number;
  max?: number;
  min?: number;
}) => {
  const percentage =
    value === undefined ? 0 : Math.round(((value - min) / max) * 100);

  const colorForPercentage = (percentage: number) => {
    if (percentage === 0) return "bg-cornflower-200";
    let color = "bg-red-600";
    if (percentage > 14) color = "bg-orange-600";
    if (percentage > 49) color = "bg-green-400";
    return color;
  };

  const almostEmpty = percentage > 0 && percentage < 10;
  const almostFull = percentage > 49;
  const charging = isDefined(value) && value === 0;

  return (
    <div
      className={classNames(
        isDefined(value) && !almostEmpty ? "" : "animate-pulse",
        "flex transition-all duration-500",
      )}
    >
      <div className="w-44">
        <div className="shadow w-1/2 rounded-lg border-4 border-cornflower-200 flex my-1 relative">
          <div className="border-r-8 h-4 rounded-r absolute flex border-cornflower-200 ml-[86px] mt-1 z-10"></div>
          <div
            className={classNames(
              colorForPercentage(percentage),
              "cursor-default rounded-sm text-xs font-bold leading-none flex items-center justify-center m-1 py-2 text-center ",
            )}
            style={{ width: `${percentage}%` }}
          >
            <div
              className={classNames(
                almostFull ? "text-cyan-950" : "text-cornflower-200",
                "absolute left-0 mx-8 ",
              )}
            >
              {`${percentage}%`}
            </div>
            {charging && (
              <div
                className={classNames(
                  almostEmpty ? "text-red-600" : "text-cornflower-200",
                  "absolute left-0 mx-8 ",
                )}
              >
                <span className="-ml-1">USB</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
