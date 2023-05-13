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
import React from "react";
import type { Renderer, ProjectAnnotations } from "@storybook/types";
import { PARAM_KEYS } from "./constants";

/**
 * Note: if you want to use JSX in this file, rename it to `preview.tsx`
 * and update the entry prop in tsup.config.ts to use "src/preview.tsx",
 */

const preview: ProjectAnnotations<Renderer> = {
  globals: {
    [PARAM_KEYS.THEMES]: [],
    [PARAM_KEYS.SELECT_DATA]: [],
    [PARAM_KEYS.THEME_ID]: null,
  },
};

export default preview;
