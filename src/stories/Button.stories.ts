import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@mantine/core";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: "Mantine/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "sm",
    children: "Button",
  },
};
