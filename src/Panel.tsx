import React, { memo } from "react";
import { useGlobals } from "storybook/internal/preview-api";
import { AddonPanel } from "storybook/internal/components";
import { PARAM_KEYS } from "./constants";
import { PanelContent } from "./components/PanelContent";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = memo(function MyPanel(props) {
  const [globals, updateGlobals] = useGlobals();

  const themeId = globals[PARAM_KEYS.THEME_ID];
  const data = globals[PARAM_KEYS.SELECT_DATA];

  return (
    <AddonPanel {...props}>
      <PanelContent
        selectedThemeId={themeId}
        setSelectedTheme={(newThemeId) => {
          updateGlobals({
            [PARAM_KEYS.THEME_ID]: newThemeId,
          });
        }}
        themeSelectData={data}
      />
    </AddonPanel>
  );
});
