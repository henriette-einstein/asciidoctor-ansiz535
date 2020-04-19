const { src, dest, series } = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const imagemin = require('gulp-imagemin')
const changed = require('gulp-changed')
const del = require('del')
const atimport = require('postcss-import')
const inlinesvg = require('postcss-inline-svg')
const autoprefixer = require('autoprefixer')

const config = {
  scss: 'src/scss/*.scss',
  images: 'src/scss/*.svg',
  distdir: 'css'
}

/**
 * Create the CSS in the CSS directory
 * @param {Callback} cb
 */
function generateCSS () {
  const plugins = [
    atimport,
    inlinesvg,
    autoprefixer({ cascade: false })
  ]
  return src(config.scss)
    .pipe(sass.sync()
      .on('error', sass.logError))
    .pipe(dest('tmp'))
    .pipe(postcss(plugins))
    .pipe(dest(config.distdir))
}

/**
 * Copy the images to the CSS directory
 * @param {Callback} cb
 */
function images () {
  return src(config.images)
    .pipe(changed(config.distdir))
    .pipe(imagemin())
    .pipe(dest('tmp'))
}

/**
 * Remove the CSS directory
 * @param {Callback} cb
 */
function clean () {
  return del([config.distdir, 'tmp'])
}

function cleanTemp () {
  return del('tmp')
}

const css = series(images, generateCSS, cleanTemp)

exports.css = css
exports.clean = series(clean, cleanTemp)
exports.build = series(clean, css)
