var gulp = require('gulp'),
    gulpPlugins = require('gulp-load-plugins')(),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync');

var src_url_browserify = 'app/src/sketch.js',
    dest_url_browserify = 'app/dist',
    output_file_name_browserify = 'sketch.js',
    src_url_watch_js = 'app/src/**/*.js',
    dest_url_watch_html = 'app/dist/*.html',
    base_dir_serve = 'app/dist';

//browserify
gulp.task('browserify',function (){
  browserify({
    entries: src_url_browserify,
    extensions: ['.js']
  })
  .transform(babelify,{presets: ['es2015']},{ debug: true })
		.bundle()
    .pipe(gulpPlugins.plumber())
		.on('error', function (err) {
			console.log('Error : ' + err.message);
			this.emit('end');
		})
    .pipe(source(output_file_name_browserify))
  	.pipe(gulp.dest(dest_url_browserify))
    .pipe(browserSync.stream());
});

//server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: base_dir_serve
        }
    });
});

//watch
gulp.task('watch', function() {
  var targets = [
    src_url_watch_js,
  ];
  gulp.watch(targets, ['browserify']);
  gulp.watch(dest_url_watch_html).on('change', browserSync.reload);
});

gulp.task('default',['serve','watch']);
