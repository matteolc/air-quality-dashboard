import { CloudyIcon, RainyIcon, SunnyIcon } from "~/icons";
import { BVOCRange, CO2Range, IAQRange, MeterType, RangeClass } from "./enum";

const rangeForEnum = (
  value: number,
  _enum: typeof CO2Range | typeof BVOCRange | typeof IAQRange,
) => {
  const key = Object.keys(_enum).reduce((prev, curr) => {
    if (value > Number(curr)) return curr;
    return prev;
  });
  console.dir({ value, _enum, key });
  return _enum[key as keyof typeof _enum];
};

export const colorFor = (value: number, type: MeterType) => {
  let _enum;
  if (type === MeterType.CO2) _enum = CO2Range;
  if (type === MeterType.BVOC) _enum = BVOCRange;
  if (type === MeterType.IAQ) _enum = IAQRange;
  if (_enum === undefined) return "";
  return RangeClass[
    rangeForEnum(value, _enum) as unknown as keyof typeof RangeClass
  ];
};

export const IconForPressure = ({ value }: { value: number | undefined }) => {
  if (value === undefined) return <div className="w-[80px] h-[80px]"></div>;
  if (value < 1000) return <RainyIcon />;
  if (value > 1000) return <SunnyIcon />;
  return <CloudyIcon />;
};
