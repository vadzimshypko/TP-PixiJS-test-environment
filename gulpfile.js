var gulp = require("gulp");
var tsc = require("gulp-typescript");
var fs = require("fs");

var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");

var browserSync = require("browser-sync");

var project = tsc.createProject("tsconfig.json");

gulp.task("build", function (done) {
    var gameSrc = ["src/**/**.ts"];

    return gulp.src(gameSrc)
        .pipe(project())
        .js
        .pipe(gulp.dest("build/"));
});

gulp.task("bundle", gulp.series("build", function (done) {
    var outputFolder = "release/";
    var outputFileName = "js/app.js";
    var mainTsFilePath = "build/main.js";

    var bundler = browserify({
        paths: ["./build"],
        debug: false,
        standalone: outputFileName
    });

    return bundler.add(mainTsFilePath).bundle()
        .pipe(source(outputFileName))
        .pipe(buffer())
        .pipe(gulp.dest(outputFolder));
}));

gulp.task("serve", gulp.series("bundle", function (done) {
    var outputFolder = "release/";

    browserSync.init({
        server: {
            baseDir: outputFolder
        },
        codeSync: false,
        online: true,
        cors: true
    });

    done();
}));
