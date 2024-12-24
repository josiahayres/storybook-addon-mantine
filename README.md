# storybook-addon-mantine

Switch between multiple mantine themes without restarting Storybook, and visualise your components / pages with each theme applied.

## How to use

### Install the addon

```shell
npm i -D storybook-addon-mantine
```

### Register the addon

Do this in your project's `.storybook/main.ts` file:

```js
// .storybook/main.ts
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  // ... other config properties
  addons: [
    // ... other addons
    "storybook-addon-mantine",
  ],
};

export default config;
```

### Themes

```ts
// src/themes.ts
import { createTheme } from "@mantine/core";

export const greenTheme = createTheme({
  primaryColor: "green",
  // ... other theme override properties
});

export const brandTheme = createTheme({
  fontFamily: "serif",
  // ... other theme override properties
});
```

### Pass your theme(s) to the addon

Do this in your `.storybook/preview.tsx` file:

```ts
import "@mantine/core/styles.css";

import { withMantineThemes } from "storybook-addon-mantine";
import { greenTheme, brandTheme } from "../themes";

export const decorators = [
  withMantineThemes({
    themes: [
      {
        id: "brand-theme",
        name: "Brand Theme",
        ...brandTheme,
      },
      {
        id: "light-green",
        name: "Light Green Theme",
        ...greenTheme,
      },
    ],
  }),
];
```

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

This is an optional object of props to pass to the `MantineProvider` component.  
See [Documentation Page](https://mantine.dev/theming/mantine-provider/#mantineprovider-props) for details.

> Most use cases won't need to set anything for this object.

### Color Schemes (Dark/Light Mode) Support

> Cannot use mantine hooks in addons for storybook v7. Need storybook manager UI to be upgraded to react 18 (so addon can use the useId hook from react). Thi seems [scheduled for Storybook 8 release](https://github.com/storybookjs/storybook/milestone/89).

Workaround is to configure mantine `useMantineColorScheme` hook in your storybook instance, see [Mantine documentation for all steps](https://mantine.dev/guides/storybook/).

Install Storybook addons:

```shell
npm install -D storybook-dark-mode @storybook/addon-styling storybook-addon-mantine
```

Add addons to .storybook/main.ts:

```jsx
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  // ... other config properties
  addons: [
    // ... other addons
    "@storybook/addon-styling",
    "storybook-dark-mode",
    "storybook-addon-mantine",
  ],
};

export default config;
```

Create your theme(s) as explained previously.

```jsx
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import React, { useEffect } from "react";
import { addons } from "@storybook/preview-api";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { MantineProvider, useMantineColorScheme } from "@mantine/core";
import { withMantineThemes } from "storybook-addon-mantine";
import { greenTheme, brandTheme } from "../themes";

const channel = addons.getChannel();

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();
  const handleColorScheme = (value: boolean) =>
    setColorScheme(value ? "dark" : "light");

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, [channel]);

  return <>{children}</>;
}

export const decorators = [
  (renderStory: any) => (
    <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>
  ),
  withMantineThemes({
    themes: [
      {
        id: "brand-theme",
        name: "Brand Theme",
        ...brandTheme,
      },
      {
        id: "light-green",
        name: "Light Green Theme",
        ...greenTheme,
      },
    ],
  }),
];
```

That should be it!

`npm run storybook`

## Versions

This table should help you with picking the correct version of `storybook-addon-mantine`:

| Storybook Version | Mantine Version | storybook-addon-mantine Version |
|:-----------------:|:---------------:|:--------------:|
| 8                 | 7               | 4.x            |
| 7                 | 7               | 3.0.1          |
| 7                 | 6               | 2.0.21         |
| 6                 | 6               | 1.3            |
| 6                 | 5               | 1.2            |
| 6                 | 4               | 1.0            |

### 5.0

Support React 19.

### 4.0

Only supports [Storybook 8](https://storybook.js.org/blog/storybook-8/) and Mantine 7. Use this version if using React 18.

### 3.0

Support Storybook 7.
Support [Mantine v7 Release](https://v7.mantine.dev/guides/6x-to-7x).

These are notable

- [React 18+ Only](https://mantine.dev/changelog/7-0-0/#react-18-only)
- [Color scheme not in theme object](https://mantine.dev/changelog/7-0-0/#built-in-color-scheme-manager)
- [Create theme function](<https://mantine.dev/changelog/7-0-0/#createtheme-function>
- [Theme object changes](https://mantine.dev/changelog/7-0-0/#theme-object-changes)

### 2.0

- Support for Storybook 7 - will not work with older versions of Storybook.
- Rebuilt entire package using [AddonKit](https://github.com/storybookjs/addon-kit) and Typescript.
- Keeps selected theme consistently when switching between component examples, rather than defaulting back to first theme every time.

### 1.3

- Support Mantine v6 (<https://mantine.dev/changelog/6-0-0/>).
- Only Require `@mantine/core` as peer dependency

### 1.2

- Update peer dependencies

### 1.1

- Support Mantine v5 (<https://mantine.dev/changelog/5-0-0/>).
- Adds second parameter `mantineProviderProps` to `mantineTheme(themesList, mantineProviderProps)`

### 1.0

Initial release
