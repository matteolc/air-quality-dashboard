import type { ReactElement } from "react";
import { classNames, isDefined } from "~/utils";
import { History } from "./History";
import { type MeterType, MeterUnit, MeterVariation } from ".";
import { colorFor } from "./utils";

export const Meter = ({
  value,
  type,
  unit,
  icon,
  accuracy,
  isReady = true,
  isStable = true,
  showName = true,
  showColorCode = false,
  variation = MeterVariation.DARK,
  maximumFractionDigits = 1,
  threshold,
  ...historyProps
}: {
  value?: number;
  type: MeterType;
  unit: MeterUnit;
  icon: ReactElement;
  accuracy?: 0 | 1 | 2 | 3;
  isReady?: boolean;
  isStable?: boolean;
  showName?: boolean;
  showColorCode?: boolean;
  variation?: MeterVariation;
  maximumFractionDigits?: number;
  threshold?: number;
}) => (
  <div className="flex flex-col shrink-0">
    <div className="flex items-baseline justify-between w-full">
      <div className="flex">
        <div
          className={
            variation === MeterVariation.DARK
              ? "text-cyan-950"
              : "text-cornflower-400"
          }
        >
          {icon}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4">
            {showName && (
              <div
                className={classNames("font-bold", "text-cyan-950 text-5xl")}
              >
                {type}
              </div>
            )}

            {accuracy !== undefined && (
              <div className="flex">
                {[0, 1, 2].map((value) => {
                  return (
                    <div
                      key={value}
                      className={classNames(
                        accuracy > value ? "bg-green-400" : "bg-cornflower-200",
                        value === 0 ? "rounded-l-sm" : "",
                        value === 2 ? "rounded-r-sm" : "",
                        "mt-1.5 rounded-l-sm shadow-sm shadow-cornflower-600 w-4 h-4",
                      )}
                    />
                  );
                })}
              </div>
            )}
          </div>
          {value !== undefined && showColorCode && (
            <div
              className={classNames(
                colorFor(value, type),
                "rounded-full w-full h-4",
              )}
            ></div>
          )}
        </div>
      </div>
      {unit !== MeterUnit.NONE && (
        <div className="flex justify-end h-full gap-4">
          <div
            className={classNames(
              "max-w-xl text-right font-bold",
              variation === MeterVariation.DARK
                ? "text-cyan-600 text-3xl"
                : "text-cornflower-200 text-2xl",
            )}
          >
            {unit}
          </div>
        </div>
      )}
    </div>
    {Object.keys(historyProps).length > 0 ? (
      <History
        {...historyProps}
        variation={variation}
        className={classNames(
          variation === MeterVariation.DARK
            ? "text-cyan-950"
            : "text-cornflower-400",
          "text-8xl",
        )}
      />
    ) : (
      <div className="flex justify-end">
        <div
          className={classNames(
            variation === MeterVariation.DARK
              ? "text-cyan-950 text-9xl"
              : "text-cornflower-400 text-8xl",
            isDefined(value) || isStable ? "animate-none" : "animate-pulse",
            isReady ? "opacity-100" : "opacity-50",
            "text-right font-bold",
          )}
        >
          {(value || 0).toLocaleString("en-US", { maximumFractionDigits })}
        </div>
      </div>
    )}
  </div>
);
