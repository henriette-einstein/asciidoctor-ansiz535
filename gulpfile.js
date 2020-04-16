const { src, dest, series } = require('gulp')
const sass = require('gulp-dart-sass')
const postcss = require('gulp-postcss')
const imagemin = require('gulp-imagemin')
const changed = require('gulp-changed')
const del = require('del')
const atimport = require('postcss-import')
const inlinesvg = require('postcss-inline-svg')

const config = {
  scss: 'src/scss/*.scss',
  resources: 'src/scss/*.css',
  images: 'src/scss/*.svg',
  distdir: 'css'
}

/**
 * Create the CSS in the CSS directory
 * @param {Callback} cb
 */
function css (cb) {
  const plugins = [
    atimport,
    inlinesvg
  ]
  src(config.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
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
 * Copy additional resources to the CSS directory
 * @param {Callback} cb
 */
function resources (cb) {
  src(config.resources)
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

exports.css = css
exports.clean = clean
exports.images = images
exports.resources = resources
exports.build = series(clean, css, resources, images)
