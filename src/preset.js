function managerEntries(entry = []) {
  return [...entry, require.resolve("./register")]; //👈 Addon implementation
}
export * from "./dist/mantineTheme";

module.exports = { managerEntries };
