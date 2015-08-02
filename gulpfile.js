//grap our gulp packages
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var less = require('gulp-less');

gulp.task('default', function() {
	// listen for changes
	livereload.listen();
	// configure nodemon
	nodemon({
		// the script to run the app
		script: 'index.js',
		ext: 'js'
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('index.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	});
	
	gulp.watch('./client/css/styles.less', ['less']);
	
	//watch html files
	gulp.watch('views/**/*', function(event){
		gulp.src('views/**/*')
	        .pipe(livereload());
	});
	
	//watch front-end app files in general, no need to restart completely
	gulp.watch('client/app/**/*', function(event){
		gulp.src('client/app/**/*')
	        .pipe(livereload());
	});
	
});

gulp.task('less', function() {
    return gulp.src('./client/css/styles.less')  // only compile the entry file
        .pipe(plumber())
        .pipe(less({
          paths: ['./', './overrides/']
        }))
        .pipe(prefix("last 8 version", "> 1%", "ie 8", "ie 7"), {cascade:true})
        .pipe(gulp.dest('./client/css/'))
        .pipe(livereload());
});

gulp.task('scripts', function(){
	gulp.src('client/app/controllers/*.js')
	    .pipe(uglify())
		.pipe(gulp.dest('client/minjs'));
	gulp.src('client/app/*.js')
	    .pipe(uglify())
		.pipe(gulp.dest('client/minjs'));
});

gulp.task('styles', function(){
	//nothing for now, compress css later
});

gulp.task('watch', function(){
	//nothing for now, use if I hae sass later
});