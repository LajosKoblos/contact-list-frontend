"use strict";

// Required libraries

var gulp    = require('gulp'),
concat      = require('gulp-concat'),
uglify      = require('gulp-uglify'),
sass        = require('gulp-sass'),
imagemin    = require('gulp-imagemin'),
sourcemaps  = require('gulp-sourcemaps'),
del         = require('del'),
argv        = require('yargs').argv,
browserSync = require('browser-sync').create();

// Paths

var paths = {
	styles: {
		src: 'assets/stylesheets/**/*.scss',
		dest: 'app/assets'
	},
	scripts: {
		src: 'assets/javascripts/**/*.js',
		dest: 'app/assets'
	},
	images: {
		src: 'assets/images/**/*',
		dest: 'app/assets'
	},
	fonts: {
		src: 'assets/fonts/**/*',
		dest: 'app/assets'
	},
	templates: {
		src: 'app/*.html'
	}
};

// Tasks

gulp.task('clean', function() {
	// return del(['build']);
});

gulp.task('scripts', ['clean'], function() {

	if (argv.e !== 'production') {
		return gulp.src(paths.scripts.src)
			.pipe(sourcemaps.init())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(paths.scripts.dest));
	} else {
		return gulp.src(paths.scripts.src)
			.pipe(uglify())
			// .pipe(concat('application.js'))
			.pipe(gulp.dest(paths.scripts.dest));
	}	
});

gulp.task('images', ['clean'], function() {
	return gulp.src(paths.images.src)
		.pipe(imagemin({ optimizationLevel: 5 }))
		.pipe(gulp.dest(paths.images.dest));
});

gulp.task('styles', ['clean'], function() {

	if (argv.e !== 'production') {
		return gulp.src(paths.styles.src)
			.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(paths.styles.dest))
			.pipe(browserSync.stream());
	} else {
		return gulp.src(paths.styles.src)
			// .pipe(concat('application.css'))
			.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
			.pipe(gulp.dest(paths.styles.dest));
	}
});

gulp.task('fonts', ['clean'], function() {
	return gulp.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.dest));
});

// Watch task

gulp.task('watch', function() {

	browserSync.init({
		proxy: (argv.p === undefined) ? 'localhost:9292' : argv.p
	});

	gulp.watch(paths.styles.src, ['styles']);
	gulp.watch(paths.scripts.src, ['scripts']).on('change', browserSync.reload);
	gulp.watch(paths.images.src, ['images']).on('change', browserSync.reload);
	gulp.watch(paths.templates.src).on('change', browserSync.reload);
});

// Default task
var defaultTasks = ['watch', 'styles', 'scripts', 'images', 'fonts'];
gulp.task('default', (argv.e !== 'production') ? defaultTasks : defaultTasks.splice(1, 4));