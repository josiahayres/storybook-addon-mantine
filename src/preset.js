import { mantineTheme } from "./mantineTheme";

function managerEntries(entry = []) {
  return [...entry, require.resolve("./register")]; //👈 Addon implementation
}

module.exports = { managerEntries, mantineTheme };
