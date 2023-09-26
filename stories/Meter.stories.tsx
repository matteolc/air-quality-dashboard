import { MeterType, MeterUnit, Meter, MeterVariation } from "~/components";
import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { AqiIcon, TemperatureIcon } from "~/icons";

const meta = {
  title: "Air Quality Dashboard/Meter",
  component: Meter,
  tags: ["autodocs"],
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

const airQualityData = {
  icon: <AqiIcon />,
  value: faker.number.float({ min: 0, max: 6000, precision: 1 }),
  unit: MeterUnit.PPB,
  type: MeterType.BVOC,
};

const weatherData = {
  icon: <TemperatureIcon />,
  value: faker.number.float({ min: 0, max: 100, precision: 1 }),
  unit: MeterUnit.CELSIUS,
  type: MeterType.TEMPERATURE,
  maximumFractionDigits: 0,
  showName: false,
  variation: MeterVariation.LIGHT,
};

export const AirQuality: Story = {
  args: { ...airQualityData },
};

export const AirQualityNoData: Story = {
  args: { ...airQualityData, value: undefined },
};

export const Weather: Story = {
  args: { ...weatherData },
};

export const WeatherNoData: Story = {
  args: { ...weatherData, value: undefined },
};
