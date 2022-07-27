# storybook-addon-mantine

Addon for storybook which wraps Mantine components with a MantineProvider. Allows you to switch between themes and see how your components and pages will look

## How to use

### Install the addon:

```shell
npm i -D storybook-addon-mantine
```

### Register the addon

Do this in your project's `.storybook/main.js` file:

```js
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-mantine",
  ],
  framework: "@storybook/react",
};
```

### Pass the theme(s) to the addon

Do this in your `.storybook/preview.js` file:

> **Info:** `themeName` is an optional key you can provide here to override the name shown in the Storybook panel.

```js
import { mantineTheme } from "storybook-addon-mantine";
import { lightTheme } from "../themes/light";

export const decorators = [
  mantineTheme([
    { ...lightTheme, themeName: "Light Mode" },
    {
      themeName: "Dark Mode - Green",
      primaryColor: "green",
      colorScheme: "dark",
      radius: 0,
    },
  ]),
];
```

## Versions

### 1.1

Support Mantine v5 (https://mantine.dev/changelog/5-0-0/)

### 1.0

Initial release

## Thanks

Thank you to the creators of [storybook-addon-material-ui](https://github.com/react-theming/storybook-addon-material-ui) - your project demonstrated how to connect the panel with the preview wrapper.
