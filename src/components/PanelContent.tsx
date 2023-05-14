import React from "react";

import { Container, Select, SelectProps, Stack, Title } from "@mantine/core";

interface PanelContentProps {
  selectedThemeId: string;
  setSelectedTheme: (newThemeId: string) => void;
  themeSelectData: SelectProps["data"];
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
    <Container>
      <Stack mt="md">
        <Title order={2}>Mantine Themes</Title>
        <Select
          data={themeSelectData || []}
          title="Themes"
          placeholder="Select theme"
          value={selectedThemeId}
          onChange={(value) => value && setSelectedTheme(value)}
          withinPortal
        ></Select>
      </Stack>
    </Container>
  );
};
