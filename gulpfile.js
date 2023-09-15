import gulp from "gulp";
import concat from "gulp-concat";
import minify from "gulp-minify";
import cleanCSS from 'gulp-clean-css';
import clean from 'gulp-clean';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import order from 'gulp-order';

// HTML task
const html = () => {
    return gulp.src("./src/*.html")
        .pipe(gulp.dest("./dist"));
}

// JavaScript task
const js = () => {
    return gulp.src("./src/scripts/**/*.js")
        .pipe(concat("scripts.js"))
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            },
        }))
        .pipe(gulp.dest("./dist/scripts"));
}

// CSS task
const css = () => {
    return gulp.src("./src/styles/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(concat("style.css"))
        .pipe(gulp.dest('./dist/styles'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/styles'));
}

// Clean output directory task
const cleanDist = () => {
    return gulp.src('./dist', {read: false})
        .pipe(clean())
}

// Serve task
const server = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
}

// Images task
const images = () => {
    return gulp.src("./src/images/**/*.*")
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
}

//Fonts task
const font = () => {
    return gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest('./dist/fonts'))
}

// Watch task
const watcher = () => {
    gulp.watch("./src/*.html", html).on('all', browserSync.reload);
    gulp.watch("./src/styles/**/*.{scss,sass,css}", css).on('all', browserSync.reload);
    gulp.watch("./src/scripts/**/*.js", js).on('all', browserSync.reload);
    gulp.watch("./src/images/**/*.*", images).on('all', browserSync.reload);
}

// Define tasks
gulp.task("html", html);
gulp.task("scripts", js);
gulp.task("style", css);
gulp.task("cleanDist", cleanDist);
gulp.task("browser-sync", server);
gulp.task("images", images);
gulp.task("watcher", watcher);
gulp.task("fonts", font);

// Development task
gulp.task("dev", gulp.series(
    gulp.parallel(html, css, js, images, font),
    gulp.parallel(server, watcher)
));

// Build task
gulp.task("build", gulp.series(
    cleanDist,
    gulp.parallel(html, css, js, images, font)
));
