import { mantineTheme } from "../src/mantineTheme";

const myTheme = {
  colorScheme: "light",
  primaryColor: "orange",
  defaultRadius: 0,
};

export const decorators = [
  mantineTheme([myTheme], {
    withCSSVariables: true,
    withGlobalStyles: true,
    withNormalizeCSS: true,
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
