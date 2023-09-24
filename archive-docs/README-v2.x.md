# storybook-addon-mantine

Addon for storybook which wraps Mantine components with a MantineProvider. Allows you to switch between themes and see how your components and pages will look

## How to use

### Install the addon

```shell
npm i -D storybook-addon-mantine
```

### Register the addon

Do this in your project's `.storybook/main.ts` or `.storybook/main.js` file:

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

> **Info:** `id` is an new required key, must be unique string.

> **Info:** `name` is an optional key you can provide here to override the name shown in the Storybook panel.

```js
import { withMantineThemes } from "storybook-addon-mantine";
import { lightTheme } from "../themes/light";

// These props are passed to the MantineProvider used by all stories.
const mantineProviderProps = {
  withCSSVariables: false,
  withGlobalStyles: true,
  withNormalizeCSS: false,
};
export const decorators = [
  withMantineThemes({
    themes: [
      { 
        id: "Dark",
        colorScheme: "dark" 
      },
      {
        id: "light-green",
        name: "Light Green Theme",
        ...lightTheme
      },
    ],
    mantineProviderProps: {
      withCSSVariables: true,
      withGlobalStyles: true,
      withNormalizeCSS: true,
    },
  }),
];
```

> **Info:** It's highly recommended to set `withGlobalStyles` to true if you use dark mode.  
> To learn more about what it does, check out https://mantine.dev/theming/mantine-provider/#css-reset-and-global-styles

## Options

### `withMantineThemes({themes, mantineProviderProps})`

Call this function inside the decorators array in `.storybook/preview.js`.

### `themes`

List of themes to show inside Storybook.
Each theme should be a valid [Mantine Theme Override Object](https://mantine.dev/theming/theme-object/#store-theme-override-object-in-a-variable).

Additionally, each theme object must have:

- `id: string` - required, this must be unique between themes
- `name?: string` - optional, name to show in list to pick themes from.

### `mantineProviderProps`

This is an object of props to pass to the `MantineProvider` component.

Typically it'll look like

```js static
const mantineProviderProps = {
  withCSSVariables: true,
  withGlobalStyles: true,
  withNormalizeCSS: true,
};
```

## Versions

### 2.0

- Support for Storybook 7 - will not work with older versions of Storybook.
- Rebuilt entire package using [AddonKit](https://github.com/storybookjs/addon-kit) and Typescript.
- Keeps selected theme consistently when switching between component examples, rather than defaulting back to first theme every time.

### 1.3

- Support Mantine v6 (https://mantine.dev/changelog/6-0-0/).
- Only Require `@mantine/core` as peer dependency

### 1.2

- Update peer dependencies

### 1.1

- Support Mantine v5 (https://mantine.dev/changelog/5-0-0/).
- Adds second parameter `mantineProviderProps` to `mantineTheme(themesList, mantineProviderProps)`

### 1.0

Initial release
