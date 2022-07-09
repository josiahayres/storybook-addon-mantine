import React from "react";
import { MantineProvider } from "@mantine/core";
import withChannel from "../adk/WithChannel";
import { EVENT_ID_INIT, EVENT_ID_DATA, EVENT_ID_BACK } from "../config";

const currentTheme = (data) => {
  try {
    const theme = data.themes[data.themeInd];
    return theme;
  } catch (err) {
    console.log(err);
    return {};
  }
};

const MantineDecorator = ({ data, story }) => {
  console.log("MantineDecorator");
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={currentTheme(data)}
    >
      {story}
    </MantineProvider>
  );
};
export default withChannel({ EVENT_ID_INIT, EVENT_ID_DATA, EVENT_ID_BACK })(
  MantineDecorator
);
