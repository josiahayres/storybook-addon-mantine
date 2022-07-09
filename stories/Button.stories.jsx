import React from "react";

import { Button } from "@mantine/core";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    compact: { control: "boolean", defaultValue: false },
  },

  args: {
    children: "Mantine Button",
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};

export const Compact = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Compact.args = { compact: true };

export const Outline = Template.bind({});
Outline.args = {
  variant: "outline",
};

export const Large = Template.bind({});
Large.args = {
  size: "lg",
};

export const Small = Template.bind({});
Small.args = {
  size: "sm",
};
