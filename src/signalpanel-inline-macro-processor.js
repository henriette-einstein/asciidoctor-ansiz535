/**
 * Asciidoctor inline macro "signalpanel"
 *
 * Copyright (c) 2020, Armin Pfarr
 * Released under the MIT License
 */
'use strict'

module.exports.register = function (registry) {
  registry.inlineMacro('signalpanel', function () {
    var self = this
    self.process(function (parent, target, opts) {
      var text = 'undefined'
      if (target === 'danger') {
        text = 'ansi-danger'
      } else if (target === 'danger-border') {
        text = 'ansi-danger ansi-style-border'
      } else if (target === 'warning') {
        text = 'ansi-warning'
      } else if (target === 'warning-border') {
        text = 'ansi-warning ansi-style-border'
      } else if (target === 'caution') {
        text = 'ansi-caution'
      } else if (target === 'caution-border') {
        text = 'ansi-caution ansi-style-border'
      } else if (target === 'notice') {
        text = 'ansi-notice'
      } else if (target === 'notice-border') {
        text = 'ansi-notice ansi-style-border'
      } else if (target === 'safety') {
        text = 'ansi-safety-instructions'
      } else if (target === 'safety-border') {
        text = 'ansi-safety-instructions ansi-style-border'
      } else {
        text = 'ansi-unknown ' + target
      }
      if (opts.color !== undefined) {
        text += ' ' + 'ansi-style-' + opts.color
      }
      if (opts.lang !== undefined) {
        text += ' ' + 'ansi-lang-' + opts.lang
      }
      const span = `<span class="${text}"/>`
      return span
    })
  })
}
