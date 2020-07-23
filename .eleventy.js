const moment = require("moment");
const CleanCSS = require("clean-css");

moment.locale("en");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("dateIso", (date) => {
    return moment(date).toISOString();
  });

  eleventyConfig.addFilter("dateReadable", (date) => {
    return moment(date).utc().format("LL"); // E.g. May 31, 2019
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
};
