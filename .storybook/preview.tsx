import type { Preview } from "@storybook/react";
import { withMantineThemes } from "../src/withMantineThemes";
import { addons } from "@storybook/preview-api";
import { useMantineColorScheme } from "@mantine/core";
import React, { useEffect } from "react";

import "@mantine/core/styles.css";

const channel = addons.getChannel();

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();
  const handleColorScheme = (value: boolean) =>
    setColorScheme(value ? "dark" : "light");

  useEffect(() => {
    channel.on("DARK_MODE", handleColorScheme);
    return () => channel.off("DARK_MODE", handleColorScheme);
  }, [channel]);

  return <>{children}</>;
}

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
  (renderStory: any) => (
    <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>
  ),
  withMantineThemes({
    themes: [
      { id: "orange", name: "Orange", primaryColor: "orange" },
      {
        id: "light-green",
        name: "Light Green",
        primaryColor: "green",
      },
    ],
  }),
];
