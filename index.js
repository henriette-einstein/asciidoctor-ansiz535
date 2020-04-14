/**
 * asciidoctor-ansiz535
 *
 * Copyright (c) 2020, Armin Pfarr
 * Released under the MIT License
 */
'use strict'
const signalpanelMacro = require('./src/signalpanel-inline-macro-processor')

module.exports.register = function (registry) {
  signalpanelMacro.register(registry)
}
