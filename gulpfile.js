var gulp = require('gulp'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
browserSync = require('browser-sync'),
eslint = require('gulp-eslint'),
prettyError = require('gulp-prettyerror'),
plumber = require('gulp-plumber')
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cssnano = require('gulp-cssnano'),
babel = require('gulp-babel');

gulp.task('sass', function() {
gulp.src('./src/sass/style.scss')
  .pipe(prettyError())
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
  }))
  .pipe(gulp.dest('./cssreadable'))
  .pipe(cssnano())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('./build/css'));
});

gulp.task('scripts', ['babel', 'lint'], function() {
gulp.src('./src/es5/main.js')
  .pipe(plumber())
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js'}))
  .pipe(gulp.dest('./build/js'));
});

gulp.task('lint', function(){
gulp.src('./src/es5/main.js')
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('babel', function(){
gulp.src('./src/main.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('./src/es5/'))
});


gulp.task('browser-sync', function() {
browserSync.init({
  server: {
      baseDir: "./"
  }
});
});
gulp.task('watch', function() {
gulp.watch(['**/*.*','!node_modules/**']).on('change', function(e){
console.log('👉 File: ' + e.path.slice(54, e.path.length) + ' 💨  Status: ' + e.type);
});
gulp.watch('sass/*.scss', ['sass'])
gulp.watch('js/*.js', ['scripts']);
gulp.watch(['*.html','build/css/*.css','build/js/*.js']).on('change', function(){
browserSync.reload();
});

});

gulp.task('dev-mode', ['browser-sync', 'watch']);

gulp.task('default', ['scripts', 'sass']);