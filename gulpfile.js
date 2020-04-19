const { src, dest, series } = require('gulp')
const sass = require('gulp-dart-sass')
const postcss = require('gulp-postcss')
const imagemin = require('gulp-imagemin')
const changed = require('gulp-changed')
const del = require('del')
const atimport = require('postcss-import')
const inlinesvg = require('postcss-inline-svg')
const autoprefixer = require('autoprefixer')
// const sourcemaps = require('gulp-sourcemaps')

const config = {
  scss: 'src/scss/*.scss',
  images: 'src/scss/*.svg',
  distdir: 'css'
}

/**
 * Create the CSS in the CSS directory
 * @param {Callback} cb
 */
function generateCSS (cb) {
  const plugins = [
    atimport,
    inlinesvg,
    autoprefixer({ cascade: false })
  ]
  src(config.scss)
    .pipe(sass().on('error', sass.logError))
    // .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    // .pipe(sourcemaps.write('.'))
    .pipe(dest(config.distdir))

  cb()
}

/**
 * Copy the images to the CSS directory
 * @param {Callback} cb
 */
function images (cb) {
  src(config.images)
    .pipe(changed(config.distdir))
    .pipe(imagemin())
    .pipe(dest(config.distdir))
  cb()
}

/**
 * Remove the CSS directory
 * @param {Callback} cb
 */
function clean () {
  return del(config.distdir)
}

exports.clean = clean
exports.images = images
exports.build = series(clean, images, generateCSS)
