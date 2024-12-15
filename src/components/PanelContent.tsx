import React from "react";

import type { ComboboxItem } from "@mantine/core";

interface PanelContentProps {
  selectedThemeId: string;
  setSelectedTheme: (newThemeId: string) => void;
  themeSelectData: ComboboxItem[];
}

/**
 * Checkout https://github.com/storybookjs/storybook/blob/next/code/addons/jest/src/components/Panel.tsx
 * for a real world example
 */
export const PanelContent: React.FC<PanelContentProps> = ({
  setSelectedTheme,
  selectedThemeId,
  themeSelectData,
}) => {
  return (
    <select
      title="Themes"
      value={selectedThemeId}
      onChange={(value) => value && setSelectedTheme(value.currentTarget.value)}
    >
      {themeSelectData?.map(({ value, label, disabled = false }) => (
        <option value={value} disabled={disabled}>
          {`${label}`}
        </option>
      ))}
    </select>
  );
};
