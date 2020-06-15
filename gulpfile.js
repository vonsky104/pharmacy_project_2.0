var gulp = require('gulp');
var sass = require('gulp-sass');

//style paths
var sassFiles = 'src/assets/*.scss',
    cssDest = 'src/assets/';

gulp.task('styles', function() {
    gulp
        .src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});

gulp.task('default', function() {
    gulp.watch(sassFiles, ['styles']);
});
