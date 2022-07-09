import React from "react";
import PropTypes from "prop-types";
import { Select } from "@mantine/core";
import withChannel from "../adk/WithChannel";
import { EVENT_ID_INIT, EVENT_ID_DATA, EVENT_ID_BACK } from "../config";

const genNameList = (themesAppliedList) =>
  themesAppliedList.map((val, ind) => val.themeName || `Theme ${ind + 1}`);

const MODS_LIST = [
  {
    title: "Palette",
    id: "palette",
    label: "P",
  },
  {
    title: "Overridings",
    id: "overridings",
    label: "O",
  },
  {
    title: "Spacing",
    id: "spacing",
    label: "S",
    disabled: true,
  },
  {
    title: "Typography",
    id: "typography",
    label: "T",
    disabled: true,
  },
  {
    title: "Full",
    id: "full",
    label: "F",
  },
];

function Dropdown({ selected, list, title, onSelect }) {
  const options = list.map((val, ind) => (
    <option value={ind} key={`${ind}@${list[ind]}`}>
      {val}
    </option>
  ));
  const select = (event) => onSelect(parseInt(event.target.value, 10));

  return (
    <select value={selected} onChange={select} title={title}>
      {options}
    </select>
  );
}

Dropdown.propTypes = {
  selected: PropTypes.number,
  title: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
};

class AddonPanel extends React.Component {
  state = {
    value: this.props.defautThemeInd,
    isThemeEditing: false,
    isThemeValid: true,
    theme: this.props.themeJSON,
    currentMode: MODS_LIST[0].id,
  };

  setMode = (currentMode) => () => this.setState({ currentMode });

  handleChange = (value) => {
    this.setState({ value }, this.props.onThemeSelect(value));
  };

  handleThemeChange = (ev) => this.setState({ theme: ev.target.value });

  onChangePalette = (palette) => {
    const { themeInd, themes } = this.props.data;
    themes[themeInd].palette = palette;
    this.props.sendData({ themes });
  };

  render() {
    const { data } = this.props;
    if (!data) return "Waiting for theme to be available";

    const { themes } = data;
    let theme;
    try {
      theme = themes[data.themeInd];
    } catch (err) {
      return "Error...";
    }
    const themeStr = JSON.stringify(theme);

    return (
      <div>
        <h1>Mantine Themes</h1>
        <Dropdown
          selected={data.themeInd}
          title="Current Theme"
          list={genNameList(themes)}
          onSelect={(themeInd) => this.props.sendData({ themeInd })}
        />
      </div>
    );
  }
}

export default withChannel({ EVENT_ID_INIT, EVENT_ID_DATA, EVENT_ID_BACK })(
  AddonPanel
);
