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
  GOOD = 1,
  MODERATE = 2,
  UNHEALTHY_SENSITIVE = 5,
  UNHEALTHY = 15,
  VERY_UNHEALTHY = 30,
  HAZARDOUS = 40,
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
  UNHEALTHY_SENSITIVE = "bg-orange-600",
  UNHEALTHY = "bg-red-600 animate-pulse",
  VERY_UNHEALTHY = "bg-purple-700  animate-pulse",
  HAZARDOUS = "bg-amber-900  animate-pulse",
}
