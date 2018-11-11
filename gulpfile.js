const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const watch = require('gulp-watch');

// Simple Message
gulp.task('message', () => {
    return console.log('Gulp is running');
});

// Webserver for running the App at localhost:8080
gulp.task('webserver', () => {
    connect.server({
        livereload: true,
        root: ['.', 'dist']
    });
});

// Live Reload the App after any changes in the files
gulp.task('liveReload', () => {
        watch('dist/*')
        .pipe(connect.reload());
});

// Copy all Html files to dist folder
gulp.task('copyHtml', () => {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Minify the Images
gulp.task('imageMin', () => {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

// Compile SASS files to CSS
gulp.task('sass', () => {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

// Concat all the JS files
gulp.task('scripts', () => {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch changes in the files
gulp.task('watch', () => {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
});

// Run the tasks
gulp.task('default', ['message', 'scripts', 'imageMin', 'sass', 'copyHtml', 'webserver', 'liveReload', 'watch']);