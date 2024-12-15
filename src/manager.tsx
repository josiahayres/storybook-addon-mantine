import React from "react";

import { addons, types } from "storybook/internal/manager-api";
import { ADDON_ID, PANEL_ID } from "./constants";
import { Panel } from "./Panel";

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Mantine Themes",
    match: ({ viewMode }) => viewMode === "story",
    render: ({ active }) => {
      return <Panel active={!!active} />;
    },
  });
});
