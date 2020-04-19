/**
 * asciidoctor-ansiz535
 *
 * Copyright (c) 2020, Armin Pfarr
 * Released under the MIT License
 */
'use strict'

const ospath = require('path')
const signalpanelMacro = require('./src/signalpanel-inline-macro-processor')

module.exports.register = function (registry) {
  signalpanelMacro.register(registry)
}
module.exports.stylesdir = function () {
  return ospath.join(__dirname, 'css')
}
module.exports.stylesheet = function () {
  return 'Z535-complete.css'
}
