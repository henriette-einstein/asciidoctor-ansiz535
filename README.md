# asciidoctor-ansiz535

> [!WARNING]
> This is a preliminary version that may not work by now. Please
> be patient until the final version arrives

AsciiDoctor support for ANSI Z535

## Installation

### Installation via YARN

```
yarn add @henriette-einstein/asciidoctor-ansiz535
```

### Installation via NPM

```
npm install @henriette-einstein/asciidoctor-ansiz535
```

## Usage

### Embed in Asciidoctor application

```
// First import the dependencies
const ospath = require('path')
const asciidoctor = require('asciidoctor')()
const registry = asciidoctor.Extensions.create()
require('asciidoctor-ansiz535').register(registry)

// Then locate the stylesheet. This is just an example. Better place the stylesheets
// somewhere in yout project and refernce them locally
const pStylesdir = path.join(process.cwd(),'node_modules/asciidoctor-ansiz535/css/')
const pStylesheet = 'z535-complete.css'

// Then invoke the conversion
const opts = {
  extension_registry: registry,
  attributes: {
    stylesdir: pStylesdir,
    stylesheet: pStylesheet
  }
}
const result = asciidoctor.convertFile(path.join(__dirname, 'Your filename goes here.adoc'), opts)

```

### Use the CLI

First you have to download the extension and unpack it.

Then you can use it in the CLI via

```
bin/asciidoctor-ansiz535.js  <File to convert>

```

### Documentation

You can read the further documentation [here](./doc/proposal.adoc)
