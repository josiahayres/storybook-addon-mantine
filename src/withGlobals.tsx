import React from "react";
import { useEffect, useGlobals } from "storybook/internal/preview-api";
import type {
  DecoratorFunction,
  Renderer,
  StoryContext,
  PartialStoryFn as StoryFunction,
} from "storybook/internal/types";
import { ADDON_ID, PARAM_KEYS } from "./constants";
import { MantineProvider } from "@mantine/core";

export const withGlobals = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>,
) => {
  const [globals] = useGlobals();
  const myAddon = globals[ADDON_ID];
  const canvas = context.canvasElement as ParentNode;

  // Is the addon being used in the docs panel
  const isInDocs = context.viewMode === "docs";

  useEffect(() => {
    if (!isInDocs) {
      addExtraContentToStory(canvas, {
        myAddon,
      });
    }
  }, [myAddon, isInDocs]);

  return StoryFn();
};

/**
 * It's not really recommended to inject content into the canvas like this.
 * But there are use cases
 */
function addExtraContentToStory(canvas: ParentNode, state: Object) {
  const preElement =
    canvas.querySelector(`[data-id="${ADDON_ID}"]`) ||
    canvas.appendChild(document.createElement("pre"));

  preElement.setAttribute("data-id", ADDON_ID);
  preElement.setAttribute(
    "style",
    `
    margin-top: 1rem;
    padding: 1rem;
    background-color: #eee;
    border-radius: 3px;
    overflow: scroll;
  `,
  );

  preElement.innerHTML = `This snippet is injected by the withGlobals decorator.
It updates as the user interacts with the ⚡ or Theme tools in the toolbar above.

${JSON.stringify(state, null, 2)}
`;
}

export const withTheme: DecoratorFunction = (storyFn, context) => {
  const canvasElement = context.canvasElement as ParentNode;

  return (
    <div id="storybook-addon-mantine--preview">
      <MantineProvider
        {...context.globals[PARAM_KEYS.PROVIDER_PROPS]}
        theme={context.globals[PARAM_KEYS.THEMES]?.find(
          (each: any) => each.id === context.globals[PARAM_KEYS.THEME_ID],
        )}
      >
        {storyFn()}
      </MantineProvider>
    </div>
  );
};
