import React from "react";
import { PARAM_KEYS } from "./constants";
import { MantineProvider } from "@mantine/core";
import type { ProjectAnnotations, Renderer } from "storybook/internal/types";

const preview: ProjectAnnotations<Renderer> = {
  decorators: [
    (RenderStory, context) => {
      return (
        <div id="storybook-addon-mantine--preview">
          <MantineProvider
            {...context.globals[PARAM_KEYS.PROVIDER_PROPS]}
            theme={context.globals[PARAM_KEYS.THEMES]?.find(
              (each: any) => each.id === context.globals[PARAM_KEYS.THEME_ID]
            )}
          >
            {RenderStory()}
          </MantineProvider>
        </div>
      );
    },
  ],
  initialGlobals: {
    [PARAM_KEYS.THEMES]: [],
    [PARAM_KEYS.SELECT_DATA]: [],
    [PARAM_KEYS.THEME_ID]: null,
    [PARAM_KEYS.PROVIDER_PROPS]: {},
  },
};

export default preview;
