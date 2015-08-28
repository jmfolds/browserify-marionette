var gulp = require('gulp');
var _ = require('underscore');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var connect = require('gulp-connect');

function build(watch) {
    var inputs = ['./js/app.js'];
    var outputLocation = './build/';

    var customOpts = {
        entries: inputs
    };

    var opts = _.extend(customOpts, watchify.args);

    var b = watchify(browserify(opts));

    function bundle() {
        gutil.log('Bundling...')
        b.bundle()
        .pipe(source('app.bundle.js'))
        .pipe(gulp.dest(outputLocation));
        gutil.log('Bundled.')

    }

    bundle();

    if (watch) {
        b.on('update', bundle);
    }
};
 
gulp.task('webserver', function() {
  connect.server();
});
 
gulp.task('default', ['webserver']);

gulp.task('build', function () {
    build();
});

gulp.task('watch', function () {
    build(true);
});