import type { Preview } from "@storybook/react";
import { withMantineThemes } from "../src/withMantineThemes";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

export const decorators = [
  withMantineThemes({
    themes: [
      { id: "Dark", name: "Dark", colorScheme: "dark", primaryColor:"orange" },
      {
        id: "light-green",
        name: "Light Green",
        colorScheme: "light",
        primaryColor: "green",
      },
    ],
    mantineProviderProps: {
      withCSSVariables: true,
      withGlobalStyles: true,
      withNormalizeCSS: true,
    },
  }),
];
