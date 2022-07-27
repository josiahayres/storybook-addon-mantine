import { mantineTheme } from "../src/mantineTheme";

const myTheme = {
  colorScheme: "dark",
  primaryColor: "orange",
};

export const decorators = [
  mantineTheme([myTheme], {
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
