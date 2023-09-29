export enum MeterVariation {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

export enum MeterType {
  BVOC = "BVOC",
  IAQ = "IAQ",
  CO2 = "eCO2",
  TEMPERATURE = "TEMPERATURE",
  PRESSURE = "PRESSURE",
  HUMIDITY = "HUMIDITY",
  NONE = "",
}

export enum MeterUnit {
  CELSIUS = "°C",
  FARENHEIT = "F",
  PASCAL = "hPa",
  PERCENT = "%",
  PPB = "PPB",
  PPM = "PPM",
  NONE = "",
}

export enum CO2Range {
  GOOD = 899,
  MODERATE = 1099,
  UNHEALTHY_SENSITIVE = 1499,
  UNHEALTHY = 1999,
  VERY_UNHEALTHY = 2999,
  HAZARDOUS = 4999,
}

export enum BVOCRange {
  GOOD = 0.9,
  MODERATE = 1.0,
  UNHEALTHY_SENSITIVE = 5.0,
  UNHEALTHY = 15.0,
  VERY_UNHEALTHY = 30.0,
  HAZARDOUS = 40.0,
}

export enum IAQRange {
  GOOD = 0,
  MODERATE = 50,
  UNHEALTHY_SENSITIVE = 100,
  UNHEALTHY = 150,
  VERY_UNHEALTHY = 200,
  HAZARDOUS = 300,
}

export enum RangeClass {
  GOOD = "bg-green-400",
  MODERATE = "bg-yellow-400",
  UNHEALTHY_SENSITIVE = "bg-amber-300",
  UNHEALTHY = "bg-orange-600 animate-pulse",
  VERY_UNHEALTHY = "bg-red-600  animate-pulse",
  HAZARDOUS = "bg-purple-700  animate-pulse",
}
