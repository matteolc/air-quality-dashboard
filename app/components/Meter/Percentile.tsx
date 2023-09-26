import { classNames } from "~/utils";
import { MeterVariation } from ".";

export const Percentile = ({
  name,
  value,
  variation,
}: {
  name?: string;
  value?: number;
  variation?: MeterVariation;
}) => (
  <div className={classNames("flex")}>
    <div
      className={classNames(
        variation === MeterVariation.LIGHT ? "bg-cyan-900" : "bg-cyan-500",
        "px-1.5 py-1 rounded-bl-lg rounded-tl-lg text-xs",
      )}
    >
      {name}
    </div>
    <div
      className={classNames(
        variation === MeterVariation.LIGHT
          ? "bg-cornflower-700"
          : "bg-cornflower-300",
        "text-right font-bold text-base px-1.5 py-0 rounded-tr-lg rounded-br-lg",
      )}
    >
      {(value || 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}
    </div>
  </div>
);
