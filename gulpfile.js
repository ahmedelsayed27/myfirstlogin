const {src, dest, series} = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const buildStyle = () => {
  return src("./src/scss/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .on("error", sass.logError)
    .pipe(dest("./dest/css"));
};
const buildJs = () => {
  return src("./src/js/*.js")
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest("./dest/js"));
};
exports.default =series(buildStyle, buildJs);