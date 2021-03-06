#!/usr/bin/env node

'use strict'

const { Options, Invoker, processor } = require('@asciidoctor/cli')
const ansiz535 = require('../index')
const pkg = require('../package.json')

process.title = 'asciidoctor-ansiz535'

class AnsiInvoker extends Invoker {
  async invoke () {
    const cliOptions = this.options
    const { args } = cliOptions
    const { verbose, files } = args
    if ((!files || files.length === 0)) {
      this.showHelp()
      return { exit: true }
    }
    cliOptions.options.attributes = cliOptions.options.attributes || []
    const stylesdir = cliOptions.options.attributes.filter(entry => entry.startsWith('stylesdir'))
    if (stylesdir.length === 0) {
      cliOptions.options.attributes.push('stylesdir=' + ansiz535.stylesdir())
    }
    const stylesheet = cliOptions.options.attributes.filter(entry => entry.startsWith('stylesheet'))
    if (stylesheet.length === 0) {
      cliOptions.options.attributes.push('stylesheet=' + ansiz535.stylesheet())
    }

    if (verbose) {
      this.showVersion()
    }
    console.log(cliOptions.options)
    const registry = processor.Extensions.create()
    ansiz535.register(registry)
    Invoker.prepareProcessor(cliOptions, processor)
    const asciidoctorOptions = Object.assign({},
      cliOptions.options,
      {
        extension_registry: registry
      }
    )
    console.log(asciidoctorOptions)
    for (const file of files) {
      if (verbose) {
        console.log(`converting file ${file}`)
      }
      processor.convertFile(file, asciidoctorOptions)
    }
    return { exit: true }
  }

  version () {
    return `Asciidoctor with ANSI Z535 support ${pkg.version} using ${super.version()}`
  }
}

async function run () {
  const options = new Options().parse(process.argv)
  return new AnsiInvoker(options).invoke()
}

run()
  .then((result) => {
    if (result.exit) {
      process.exit(0)
    }
  })
  .catch((error) => {
    console.log('error', error)
    process.exit(1)
  })
