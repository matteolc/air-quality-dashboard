import { CloudyIcon, RainyIcon, SunnyIcon } from "~/icons";
import { MeterType } from "./enum";

const colorForCo2 = (value: number) => {
  let color = "bg-green-400";
  if (value > 899) {
    color = "bg-yellow-400";
  }
  if (value > 1099) {
    color = "bg-amber-300";
  }
  if (value > 1499) {
    color = "bg-orange-600 animate-pulse";
  }
  if (value > 1999) {
    color = "bg-red-600  animate-pulse";
  }
  if (value > 2999) {
    color = "bg-purple-700  animate-pulse";
  }
  if (value > 4999) {
    color = "bg-amber-950  animate-pulse";
  }
  return color;
};

const colorForBvoc = (value: number) => {
  let color = "bg-green-400";
  if (value > 0.9) {
    color = "bg-yellow-400";
  }
  if (value > 2.9) {
    color = "bg-amber-300";
  }
  if (value > 9.9) {
    color = "bg-orange-600  animate-pulse";
  }
  if (value > 19.9) {
    color = "bg-red-600 animate-pulse";
  }
  if (value > 29.9) {
    color = "bg-purple-700 animate-pulse";
  }
  if (value > 39.9) {
    color = "bg-amber-950 animate-pulse";
  }
  return color;
};

export const colorFor = (value: number, type: MeterType) => {
  if (type === MeterType.CO2) return colorForCo2(value);
  if (type === MeterType.BVOC) return colorForBvoc(value);
  return "bg-green-400";
};

export const IconForPressure = ({ value }: { value: number | undefined }) => {
  if (value === undefined) return <></>;
  if (value < 1000) return <RainyIcon />;
  if (value > 1000) return <SunnyIcon />;
  return <CloudyIcon />;
};
