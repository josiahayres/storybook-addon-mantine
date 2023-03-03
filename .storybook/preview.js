import { mantineTheme } from "../src/mantineTheme";

const myTheme = {
  colorScheme: "dark",
  primaryColor: "orange",
};

const light = {
  colorScheme: "light",
  primaryColor: "blue",
};

export const decorators = [
  mantineTheme([myTheme, light], {
    withCSSVariables: false,
    withGlobalStyles: true,
    withNormalizeCSS: false,
  }),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
