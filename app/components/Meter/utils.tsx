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
  if (value > 1.0) {
    color = "bg-amber-300";
  }
  if (value > 5.0) {
    color = "bg-orange-600  animate-pulse";
  }
  if (value > 15.0) {
    color = "bg-red-600 animate-pulse";
  }
  if (value > 30.0) {
    color = "bg-purple-700 animate-pulse";
  }
  if (value > 40.0) {
    color = "bg-amber-950 animate-pulse";
  }
  return color;
};

const colorForIaq = (value: number) => {
  let color = "bg-green-400";
  if (value > 50) {
    color = "bg-amber-300";
  }
  if (value > 100) {
    color = "bg-orange-600  animate-pulse";
  }
  if (value > 150) {
    color = "bg-red-600 animate-pulse";
  }
  if (value > 200) {
    color = "bg-purple-700 animate-pulse";
  }
  if (value > 300) {
    color = "bg-amber-950 animate-pulse";
  }
  return color;
};

export const colorFor = (value: number, type: MeterType) => {
  if (type === MeterType.CO2) return colorForCo2(value);
  if (type === MeterType.BVOC) return colorForBvoc(value);
  if (type === MeterType.IAQ) return colorForIaq(value);
  return "bg-green-400";
};

export const IconForPressure = ({ value }: { value: number | undefined }) => {
  if (value === undefined) return <></>;
  if (value < 1000) return <RainyIcon />;
  if (value > 1000) return <SunnyIcon />;
  return <CloudyIcon />;
};
