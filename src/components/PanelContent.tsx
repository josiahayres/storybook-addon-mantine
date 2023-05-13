import React from "react";
import { styled } from "@storybook/theming";
import { Button } from "@storybook/components";

import { Container, Select, SelectProps, Stack, Title } from "@mantine/core";

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

type Results = {
  danger: any[];
  warning: any[];
};

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
          onChange={(value) => setSelectedTheme(value)}
        ></Select>
      </Stack>
    </Container>
  );
};
