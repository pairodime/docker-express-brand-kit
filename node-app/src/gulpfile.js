//get gulp node package
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    babel = require("gulp-babel"),
    plumber = require('gulp-plumber');

gulp.task('sass', function() {
    gulp.src('public/stylesheets/scss/*.s*ss')
        .pipe(plumber())
        // Sourcemaps for Chrome Browser Debuging
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', onError))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        // Add Vendor Prefizxes for CSS3 styles
        .pipe(autoprefixer())
        // Writes sourcemaps into the CSS file
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('babel', function() {
    gulp.src('public/javascripts/babel/*.js')
        .pipe(plumber())
        .pipe(babel())
        .pipe(concat('script.js'))
        .pipe(babel().on('error', onError))
        .pipe(gulp.dest('public/javascripts'));
});

// Minification for Distribution
gulp.task('js-min', function() {
    gulp.src('public/javascripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts/min'));
});

gulp.task('css-min', function() {
    gulp.src('public/stylesheets/style.css')
        .pipe(uglifycss())
        .pipe(gulp.dest('public/stylesheets/min'));
});

// Auto Watch
gulp.task('watch', ['sass', 'babel'], function() {
    gulp.watch('public/stylesheets/scss/*.scss', ['sass']);
    gulp.watch('public/javascripts/babel/*.js', ['babel']);
});

gulp.task('default', ['watch']);

// Make sure to not break watch when error occurs
function onError(err) {
  console.log(err);
  this.emit('end');
}