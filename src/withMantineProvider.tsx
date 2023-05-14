import React, { ReactNode } from "react";

import {
  MantineProvider,
  MantineProviderProps,
  MantineThemeOverride,
} from "@mantine/core";
import type {
  Renderer,
  PartialStoryFn as StoryFunction,
  StoryContext,
} from "@storybook/types";
import { useGlobals } from "@storybook/preview-api";

import { PARAM_KEYS } from "./constants";

export type ThemeWithName = MantineThemeOverride & {
  id: string;
  name?: string;
};

type Props = {
  themes: ThemeWithName[];
  mantineProviderProps?: Partial<
    Omit<MantineProviderProps, "children" | "theme">
  >;
};

export const withMantineProvider = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>
) => {
  const [globals, updateGlobals] = useGlobals();

  const theme = globals[PARAM_KEYS.THEMES]?.find(
    (eachTheme: any) => eachTheme.id === globals[PARAM_KEYS.THEME_ID]
  );

  const props = globals[PARAM_KEYS.PROVIDER_PROPS];


  console.log("withMantineProvider theme, globals", theme, globals, context)
  return (
    <MantineProvider
      withGlobalStyles
      {...props}
      theme={theme}
    >
      {StoryFn(context)}
    </MantineProvider>
  );
};
