const themeDir = __dirname + "/../../";

module.exports = {
  plugins: [
    require("autoprefixer")({
      path: [themeDir],
    }),
  ],
};
