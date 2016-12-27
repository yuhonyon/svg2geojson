var gulp = require("gulp");
var rename = require('gulp-rename');
var svg2json = require('gulp-svg2json');
var coord = require('gulp-coord');
gulp.task("default", function() {
    return gulp.src("./svg/*.svg")
        .pipe(rename(function(path) {
            path.dirname = path.basename;
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(svg2json())
        .pipe(rename(function(path) {
            path.basename += "-geojson"
            path.extname = ".json";
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(coord())
        .pipe(rename(function(path) {
            path.basename += "-coord"
            path.extname = ".json";
        }))
        .pipe(gulp.dest('dist/'))
});
