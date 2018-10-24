const tokenize = require('./src/tokenize').tokenize
const parse = require('./src/parse').parse
const compile = require('./src/compile').compile

module.exports = {
    tokenize,
    parse,
    compile
}