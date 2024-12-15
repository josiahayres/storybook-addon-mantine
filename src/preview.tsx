/**
 * A decorator is a way to wrap a story in extra “rendering” functionality. Many addons define decorators
 * in order to augment stories:
 * - with extra rendering
 * - gather details about how a story is rendered
 *
 * When writing stories, decorators are typically used to wrap stories with extra markup or context mocking.
 *
 * https://storybook.js.org/docs/react/writing-stories/decorators
 */

import { PARAM_KEYS } from "./constants";
import { MantineProvider } from "@mantine/core";

import React from "react";
import { Preview } from "@storybook/react";

const preview: Preview = {
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
            <RenderStory />
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
