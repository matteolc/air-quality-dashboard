import { classNames, isDefined } from "~/utils";
import type { MeterVariation } from ".";
import { Percentile } from "./Percentile";

const Value = ({ value, success }: { value?: number; success?: boolean }) => (
  <div
    className={classNames(
      isDefined(value) ? "animate-none" : "animate-pulse",
      isDefined(success) ? (success ? "text-green-400" : "text-red-600") : "",
      "text-right font-bold",
    )}
  >
    {(value || 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}
  </div>
);

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
        <Value value={max} success={false} />
        <Value value={min} success={true} />
      </div>
      <div className={className}>
        <Value value={avg} />
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
