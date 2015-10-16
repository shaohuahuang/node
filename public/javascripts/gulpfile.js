var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');

var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var watchify = require('watchify');
var rename = require('gulp-rename')

function compile(watch){
    var bundler = watchify(browserify('./index.js',{debug: true}).transform(babelify));

    function rebundle(){
        bundler.bundle()
            .on('error', function(err) {console.error(err); this.emit('end');})
            .pipe(source('index.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write())
            .pipe(rename('bundle.js'))
            .pipe(gulp.dest('./bundle'));
    }
    if (watch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            rebundle();
        });
    }
    rebundle();
}

function watch() {
    return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);