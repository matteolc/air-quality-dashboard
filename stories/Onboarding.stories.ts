import { Onboarding, OnboardingStatus } from "~/components";
import type { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

const meta = {
  title: "Air Quality Dashboard/Onboarding",
  component: Onboarding,
  tags: ["autodocs"],
} satisfies Meta<typeof Onboarding>;

export default meta;
type Story = StoryObj<typeof meta>;

const onboarding = {
  title: faker.lorem.sentence(3),
  subtitle: faker.lorem.sentence(5),
  name: faker.airline.airport().name,
  description: faker.lorem.paragraph(2),
};

export const Complete: Story = {
  args: { onboarding: { ...onboarding, status: OnboardingStatus.COMPLETE } },
};

export const Ongoing: Story = {
  args: { onboarding: { ...onboarding, status: OnboardingStatus.ONGOING } },
};
