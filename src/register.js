import React from "react";

import { addons } from "@storybook/addons";
import UIAddonPanel from "./UI/AddonPanel";

import { ADDON_ID, PANEL_ID } from "./config";

addons.register(ADDON_ID, (api) => {
  addons.addPanel(PANEL_ID, {
    title: "Mantine Theme",
    render: ({ active, key } = {}) => (
      <UIAddonPanel
        key={key}
        api={api}
        active={active}
        panel
        pointName="addon panel"
      />
    ),
  });
});
