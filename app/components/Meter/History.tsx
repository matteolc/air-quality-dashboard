import { classNames, isDefined } from "~/utils";
import type { MeterVariation } from ".";
import { Percentile } from "./Percentile";

export const History = ({
  min,
  max,
  avg,
  p95,
  p90,
  p75,
  p50,
  className,
  variation,
}: {
  min?: number;
  max?: number;
  avg?: number;
  p95?: number;
  p90?: number;
  p75?: number;
  p50?: number;
  className: string;
  variation?: MeterVariation;
}) => (
  <div className="flex flex-col">
    <div className="flex justify-end">
      <div className="flex flex-col mr-8 mt-2.5 text-4xl">
        <div
          className={classNames(
            isDefined(max) ? "animate-none" : "animate-pulse",
            "text-right font-bold text-red-600",
          )}
        >
          {(max || 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
        <div
          className={classNames(
            isDefined(min) ? "animate-none" : "animate-pulse",
            "text-right font-bold text-green-400",
          )}
        >
          {(min || 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
      </div>
      <div>
        <div
          className={classNames(
            className,
            isDefined(avg) ? "animate-none" : "animate-pulse",
            "text-right font-bold",
          )}
        >
          {(avg || 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
      </div>
    </div>
    <div className="flex gap-4 justify-end mt-2">
      <div className={classNames(className, "flex gap-2")}>
        <Percentile name="P95" value={p95} variation={variation} />
        <Percentile name="P90" value={p90} variation={variation} />
        <Percentile name="P75" value={p75} variation={variation} />
        <Percentile name="P50" value={p50} variation={variation} />
      </div>
    </div>
  </div>
);
