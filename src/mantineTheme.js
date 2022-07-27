import React from "react";

import { EVENT_ID_INIT, EVENT_ID_DATA, EVENT_ID_BACK } from "./config";
import MantineDecorator from "./UI/MantineDecorator";
import { createStore } from "./adk/decorator";

const lightBaseTheme = {
  colorScheme: "light",
  themeName: "Light Theme",
};
const darkBaseTheme = {
  colorScheme: "dark",
  themeName: "Dark Theme",
};

export function mantineTheme(themes, args = {}) {
  const store = createStore(
    EVENT_ID_INIT,
    EVENT_ID_DATA,
    EVENT_ID_BACK,
    "iframe"
  );

  let themesInitList = [lightBaseTheme, darkBaseTheme];

  if (themes) {
    if (Array.isArray(themes)) {
      themesInitList = themes;
      themesInitList.forEach((val, ind) => {
        if (typeof val === "string") {
          /* note: unsupported names goes as lightBaseTheme
          if (val === lightBaseTheme.themeName) {
              themesInitList[ind] = lightBaseTheme;
          }
          */
          if (val === darkBaseTheme.themeName) {
            themesInitList[ind] = darkBaseTheme;
          } else {
            themesInitList[ind] = lightBaseTheme;
          }
        }
      });
    } else {
      themesInitList = [themes];
    }
  }

  store.onConnected(() =>
    store.sendInit({
      themes: themesInitList,
      themeInd: 0,
      themeProviderProps: args,
    })
  );

  return (story) => {
    const storyItem = story();
    return (
      <MantineDecorator
        story={storyItem}
        initData={{
          themes: themesInitList,
          themeInd: 0,
          themeProviderProps: args,
        }}
      />
    );
  };
}
