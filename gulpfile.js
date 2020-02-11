const {watch, src, dest, series} = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const SRC_DIR = './src';
const ASSETS_DIRNAME = 'assets';
const DIST_DIR = './www';

function taskMinifyImages() {
  return src(`${SRC_DIR}/${ASSETS_DIRNAME}/images/**/*`)
    .pipe(imagemin())
    .pipe(dest(`${DIST_DIR}/${ASSETS_DIRNAME}/images/**/*`));
}

function taskCopyAssets() {
  return src(SRC_DIR + `/${ASSETS_DIRNAME}/**/*.*`)
    .pipe(dest(DIST_DIR + `/${ASSETS_DIRNAME}/`));
}

function taskCopyHtml() {
  return src(SRC_DIR + '/**/*.html')
    .pipe(dest(DIST_DIR));
}

function taskSassDev() {
  return src([SRC_DIR + '/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write())
    .pipe(dest(DIST_DIR))
    .pipe(browserSync.stream())
}

function taskSassProd() {
  return src([SRC_DIR + '/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(dest(DIST_DIR));
}

function taskBabelDev() {
  return src(SRC_DIR + '/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(dest(DIST_DIR));
}

function taskBabelProd() {
  return src(SRC_DIR + '/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest(DIST_DIR))
}

function taskWatch() {
  browserSync.init({
    server: './www',
  });
  watch('src/**/*.html', series(taskCopyHtml)).on('change', browserSync.reload);
  watch('src/**/*.js', series(taskBabelDev)).on('change', browserSync.reload);
  watch('src/**/*.scss', series(taskSassDev));
}

exports.watch = series(taskCopyHtml, taskCopyAssets, taskSassDev, taskBabelDev, taskWatch);
exports.build = series(taskCopyHtml, taskCopyAssets, taskMinifyImages, taskSassProd, taskBabelProd);
