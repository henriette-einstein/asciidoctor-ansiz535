const path = require('path')
const asciidoctor = require('asciidoctor')()
const registry = asciidoctor.Extensions.create()
require('../src/signalpanel-inline-macro-processor').register(registry)

describe('Testing signalpanel macro', () => {
  it('should have registered the inline macro', () => {
    const opts = { extension_registry: registry }
    const content = 'Test'
    const result = asciidoctor.load(content, opts)
    expect(result.getExtensions().hasInlineMacros()).toBe(true)
    expect(result.getExtensions().getInlineMacros().length).toEqual(1)
    expect(result.getExtensions().getInlineMacros()[0].kind).toEqual('inline_macro')
    expect(result.getExtensions().getInlineMacroFor('signalpanel').kind).toEqual('inline_macro')
  })
  it('should return spans with ansi-* classes', () => {
    const opts = { extension_registry: registry, to_file: false }
    const result = asciidoctor.convertFile(path.join(__dirname, 'signalpanel.adoc'), opts)
    expect(result).toContain('<span class="ansi-danger"/>')
    expect(result).toContain('<span class="ansi-warning"/>')
    expect(result).toContain('<span class="ansi-caution"/>')
    expect(result).toContain('<span class="ansi-notice"/>')
    expect(result).toContain('<span class="ansi-safety-instructions"/>')
    expect(result).toContain('<span class="ansi-unknown thisisnotcorrect"/>')
  })
  it('should return spans with ansi-style-* classes', () => {
    const opts = { extension_registry: registry, to_file: false }
    const result = asciidoctor.convertFile(path.join(__dirname, 'signalpanel.adoc'), opts)
    expect(result).toContain('<span class="ansi-danger ansi-style-bw"/>')
    expect(result).toContain('<span class="ansi-danger ansi-style-wb"/>')
  })
  it('should return spans with ansi-style-border classes', () => {
    const opts = { extension_registry: registry, to_file: false }
    const result = asciidoctor.convertFile(path.join(__dirname, 'signalpanel.adoc'), opts)
    expect(result).toContain('<span class="ansi-danger ansi-style-border"/>')
    expect(result).toContain('<span class="ansi-warning ansi-style-border"/>')
    expect(result).toContain('<span class="ansi-caution ansi-style-border"/>')
    expect(result).toContain('<span class="ansi-notice ansi-style-border"/>')
    expect(result).toContain('<span class="ansi-safety-instructions ansi-style-border"/>')
  })
  it('should return spans with ansi-lang-de classes', () => {
    const opts = { extension_registry: registry, to_file: false }
    const result = asciidoctor.convertFile(path.join(__dirname, 'signalpanel.adoc'), opts)
    expect(result).toContain('<span class="ansi-danger ansi-lang-de"/>')
    expect(result).toContain('<span class="ansi-warning ansi-lang-de"/>')
    expect(result).toContain('<span class="ansi-caution ansi-lang-de"/>')
    expect(result).toContain('<span class="ansi-notice ansi-lang-de"/>')
    expect(result).toContain('<span class="ansi-safety-instructions ansi-lang-de"/>')
  })
  it('should return spans with ansi-lang-fr classes', () => {
    const opts = { extension_registry: registry, to_file: false }
    const result = asciidoctor.convertFile(path.join(__dirname, 'signalpanel.adoc'), opts)
    expect(result).toContain('<span class="ansi-danger ansi-lang-fr"/>')
    expect(result).toContain('<span class="ansi-warning ansi-lang-fr"/>')
    expect(result).toContain('<span class="ansi-caution ansi-lang-fr"/>')
    expect(result).toContain('<span class="ansi-notice ansi-lang-fr"/>')
    expect(result).toContain('<span class="ansi-safety-instructions ansi-lang-fr"/>')
  })
  it('should return spans with ansi-lang-es classes', () => {
    const opts = { extension_registry: registry, to_file: false }
    const result = asciidoctor.convertFile(path.join(__dirname, 'signalpanel.adoc'), opts)
    expect(result).toContain('<span class="ansi-danger ansi-lang-es"/>')
    expect(result).toContain('<span class="ansi-warning ansi-lang-es"/>')
    expect(result).toContain('<span class="ansi-caution ansi-lang-es"/>')
    expect(result).toContain('<span class="ansi-notice ansi-lang-es"/>')
    expect(result).toContain('<span class="ansi-safety-instructions ansi-lang-es"/>')
  })
})
