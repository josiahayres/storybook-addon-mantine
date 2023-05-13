import React from "react";
import { useGlobals } from "@storybook/manager-api";
import { AddonPanel } from "@storybook/components";
import { PARAM_KEYS } from "./constants";
import { PanelContent } from "./components/PanelContent";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const [globals, updateGlobals] = useGlobals();

  return (
    <AddonPanel {...props}>
      <PanelContent
        selectedThemeId={globals[PARAM_KEYS.THEME_ID]}
        setSelectedTheme={(newThemeId) => {
          updateGlobals({
            [PARAM_KEYS.THEME_ID]: newThemeId,
          });
        }}
        themeSelectData={globals[PARAM_KEYS.SELECT_DATA]}
      />
    </AddonPanel>
  );
};
