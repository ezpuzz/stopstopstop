#!/usr/bin/env node

const meow = require('meow')

const cli = meow(
  `
        Usage
          $ stop <input>
`,
  {}
)

var output = cli.input[0].split(' ')

const { isStopword } = require('is-stopword')
output = output.filter(word => !isStopword(word))

output = require('stopword').removeStopwords(output)

output = output.filter(word => !require('stopwords').english.includes(word))

output = output.filter(word => !require('stopwords-en').includes(word))

output = output.filter(word => !require('stopwords-json').en.includes(word))

const slug = require('slug')
slug.defaults.mode = 'rfc3986'
console.log(slug(output.join(' ')))
