const { src, dest, series, parallel } = require('gulp')
const sass = require('gulp-dart-sass')
const imagemin = require('gulp-imagemin')
const changed = require('gulp-changed')
const del = require('del')
const asciidoc = require('@henriette-einstein/gulp-asciidoctor')

const config = {
    scss: 'src/scss/*.scss',
    images: 'src/scss/*.svg',
    testdata: 'doc/**/*.adoc',
    testdir: 'tests',
    distdir: 'dist'
}

function testData (cb) {
    src(config.testdata)
        .pipe(asciidoc())
        .pipe(dest(config.testdir))
    cb()
}

/**
 * Create the CSS
 * @param {Callback} cb 
 */
function css (cb) {
    src(config.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(config.distdir))
    cb()
}

function images (cb) {
    src(config.images)
        .pipe(changed(config.distdir))
        .pipe(imagemin())
        .pipe(dest(config.distdir))
    cb()
}

function clean () {
    return del(config.distdir)
}

exports.css = css
exports.clean = clean
exports.images = images
exports.test = series(css, testData)
exports.build = series(clean, css, images)