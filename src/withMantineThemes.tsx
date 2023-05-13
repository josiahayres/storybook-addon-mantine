import React, { useEffect, useMemo } from "react";

import {
  MantineProvider,
  MantineProviderProps,
  MantineThemeOverride,
} from "@mantine/core";
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

export const withMantineThemes = (props: Props) => {
  return (Story: React.FC) => {
    const [globals, updateGlobals] = useGlobals();

    useEffect(() => {
      const themes = globals[PARAM_KEYS.THEMES];
      if (
        !Array.isArray(themes) ||
        (themes.length < 1 && props.themes.length > 0)
      ) {
        console.log("withMantineThemes - useEffect - updating themes", props);
        updateGlobals({
          [PARAM_KEYS.THEMES]: props.themes,
          [PARAM_KEYS.SELECT_DATA]: props.themes.map((eachTheme, index) => ({
            label: eachTheme?.name || `Theme ${index + 1}`,
            value: eachTheme.id,
          })),
          [PARAM_KEYS.THEME_ID]: props.themes?.[0]?.id,
        });
      }
      if  (themes.length < 1 && props.themes.length > 0){
        updateGlobals({
          [PARAM_KEYS.THEMES]: props.themes,
          [PARAM_KEYS.SELECT_DATA]: [{
            label: `Light`,
            value: 'light',
          }],
          [PARAM_KEYS.THEME_ID]: 'light',
        });
      }
    }, [props.themes]);

    const theme = globals[PARAM_KEYS.THEMES].find(
      (eachTheme: any) => eachTheme.id === globals[PARAM_KEYS.THEME_ID]
    );

    return (
      <MantineProvider
        withGlobalStyles
        theme={theme}
        {...props.mantineProviderProps}
      >
        <Story />
      </MantineProvider>
    );
  };
};
