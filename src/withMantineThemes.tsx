import React from "react";
import type { MantineProviderProps, MantineThemeOverride } from "@mantine/core";
import { useEffect } from "react";
import { useGlobals } from "storybook/internal/preview-api";
import { PARAM_KEYS } from "./constants";

import type {
  Renderer,
  StoryContext,
  PartialStoryFn as StoryFunction,
} from "storybook/internal/types";

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

export const withMantineThemes = (props: Props) => {
  return (
    StoryFn: StoryFunction<Renderer>,
    context: StoryContext<Renderer>
  ) => {
    const [globals, updateGlobals] = useGlobals();

    useEffect(() => {
      const themes = globals[PARAM_KEYS.THEMES];
      if (!props.themes || !Array.isArray(themes)) {
        console.warn("No themes provided.");
        return;
      }
      if (themes.length < 1 && props.themes.length > 0) {
        try {
          updateGlobals({
            [PARAM_KEYS.THEMES]: props.themes,
            [PARAM_KEYS.SELECT_DATA]: props.themes.map((eachTheme, index) => ({
              label: eachTheme?.name || `Theme ${index + 1}`,
              value: eachTheme.id,
            })),
            [PARAM_KEYS.THEME_ID]: props.themes?.[0]?.id,
            [PARAM_KEYS.PROVIDER_PROPS]: props?.mantineProviderProps,
          });
        } catch (error) {
          console.log("error calling update globals");
        }
      }
    }, [props.themes]);

    return StoryFn();
  };
};
