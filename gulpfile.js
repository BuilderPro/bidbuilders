var gulp = require('gulp'),
watch = require('gulp-watch'),
less = require('gulp-less'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
minifyHtml = require('gulp-minify-html'),
html2js = require('gulp-angular-templatecache')

gulp.task('styles', function() {
	return gulp.src([
    'public/assets/less/app.less'
  ])
	.pipe(less())
	.pipe(rename('bb.min.css'))
	.pipe(minifycss())
	.pipe(gulp.dest('public/dist/'))
	.pipe(notify({ message: 'styles re-compiled' }));
});

gulp.task('lint', function() {
  return gulp.src('public/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('fonts', function() {
  return gulp.src('public/bower_components/font-awesome/fonts/*')
  	.pipe(gulp.dest('public/dist/'));
});

gulp.task('plugins', function() {
	return gulp.src([
  		'public/bower_components/jquery/dist/jquery.min.js',
		  'public/bower_components/angular/angular.min.js',
      'public/bower_components/angular-ui-router/release/angular-ui-router.min.js',
  		'public/bower_components/moment/min/moment.min.js',
      'public/bower_components/angular-route/angular-route.min.js',
      'public/bower_components/angular-animate/angular-animate.min.js',
      'public/bower_components/AngularJS-Toaster/toaster.js',
      'public/bower_components/angular-bootstrap/ui-bootstrap.min.js',
      'public/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
	])
	.pipe(concat('plugins.min.js'))
	.pipe(gulp.dest('public/dist/'));
});

gulp.task('template-cache', function() {
  return gulp.src([
		'public/app/**/*.html'
	])
	.pipe(html2js({
        module: 'bidBuilders'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(".template-cache"))
});

gulp.task('minify', ['template-cache'], function(){
  return gulp.src([
      'public/app/app.js',  		
  		'public/app/**/*.js',
  		'.template-cache/templates.js'
  	])
    .pipe(concat('bb.js'))
    .pipe(gulp.dest('public/dist/'))
    .pipe(rename('bb.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/'))
    .pipe(notify({ message: 'app re-compiled' }));
});

gulp.task('js', ['lint', 'plugins', 'minify']);
gulp.task('css', ['styles', 'fonts']);
gulp.task('default', ['js', 'css']);

gulp.task('watch', ['default'], function() {
  gulp.watch([
    'public/app/**/*.js',
    'public/app/**/*.html'
  ], ['js'])

  gulp.watch([
    'public/assets/app.less'
  ], ['css'])
});
