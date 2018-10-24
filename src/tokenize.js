const types = {
    TYPE_LEFT_BRACE: 'TYPE_LEFT_BRACE',
    TYPE_RIGHT_BRACE: 'TYPE_RIGHT_BRACE',
    TYPE_LEFT_BRACKET: 'TYPE_LEFT_BRACKET',
    TYPE_RIGHT_BRACKET: 'TYPE_RIGHT_BRACKET',
    TYPE_COLON: 'TYPE_COLON',
    TYPE_COMMA: 'TYPE_COMMA',
    TYPE_QUOTE: 'TYPE_QUOTE',
    TYPE_NUMBER: 'TYPE_NUMBER',
    TYPE_STRING: 'TYPE_STRING',
    TYPE_NULL: 'TYPE_NULL',
    TYPE_BOOL: 'TYPE_BOOL'
}

const values = {
    TYPE_LEFT_BRACE: '{',
    TYPE_RIGHT_BRACE: '}',
    TYPE_LEFT_BRACKET: '[',
    TYPE_RIGHT_BRACKET: ']',
    TYPE_COLON: ':',
    TYPE_COMMA: ',',
    TYPE_QUOTE: '\"',
    TYPE_NULL: null
}

function tokenize(input) {
    input = input.split('').reverse()
    let row = 1
    let col = 0
    let result = []

    while (input.length) {
        let token = input.pop()
        col++

        // {
        if (token === values.TYPE_LEFT_BRACE) {
            result.push({
                type: types.TYPE_LEFT_BRACE,
                value: values.TYPE_LEFT_BRACE,
                raw: token,
                loc: {
                    start: [row, col],
                    end: [row, col]
                }
            })
            continue
        }
        // }
        if (token === values.TYPE_RIGHT_BRACE) {
            result.push({
                type: types.TYPE_RIGHT_BRACE,
                value: values.TYPE_RIGHT_BRACE,
                raw: token,
                loc: {
                    start: [row, col],
                    end: [row, col]
                }
            })
            continue
        }

        // [
        if (token === values.TYPE_LEFT_BRACKET) {
            result.push({
                type: types.TYPE_LEFT_BRACKET,
                value: values.TYPE_LEFT_BRACKET,
                raw: token,
                loc: {
                    start: [row, col],
                    end: [row, col]
                }
            })
            continue
        }
        // ]
        if (token === values.TYPE_RIGHT_BRACKET) {
            result.push({
                type: types.TYPE_RIGHT_BRACKET,
                value: values.TYPE_RIGHT_BRACKET,
                raw: token,
                loc: {
                    start: [row, col],
                    end: [row, col]
                }
            })
            continue
        }
        // :
        if (token === values.TYPE_COLON) {
            result.push({
                type: types.TYPE_COLON,
                value: values.TYPE_COLON,
                raw: token,
                loc: {
                    start: [row, col],
                    end: [row, col]
                }
            })
            continue
        }
        // ,
        if (token === values.TYPE_COMMA) {
            result.push({
                type: types.TYPE_COMMA,
                value: values.TYPE_COMMA,
                raw: token,
                loc: {
                    start: [row, col],
                    end: [row, col]
                }
            })
            continue
        }
        // "
        if (token === values.TYPE_QUOTE) {
            let value = ''
            let start = col

            if (!input.length) {
                throw `error: (${row},${col}), just one '"'`
            }
            while (input.length) {
                token = input.pop()
                col++
                if (!input.length && token !== values.TYPE_QUOTE) {
                    throw `error: (${row},${col}), just one "`
                }
                if (token === values.TYPE_QUOTE) break
                value += token
            }
            result.push({
                type: types.TYPE_STRING,
                value: value,
                raw: `"${value}"`,
                loc: {
                    start: [row, start],
                    end: [row, col]
                }
            })

            continue
        }
        // 123456
        if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(token)) {
            let value = token
            let start = col - 1
            while (input.length) {
                token = input.pop()
                if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(token)) {
                    value += token
                    col++
                    continue
                } else {
                    input.push(token)
                    break
                }

            }
            result.push({
                type: types.TYPE_NUMBER,
                value: +value,
                raw: value,
                loc: {
                    start: [row, start],
                    end: [row, col]
                }
            })
            continue
        }
        // true
        if (token === 't') {
            let value = token + input.pop() + input.pop() + input.pop()
            if (value === 'true') {
                result.push({
                    type: types.TYPE_BOOL,
                    value: true,
                    raw: value,
                    loc: {
                        start: [row, col],
                        end: [row, col + 3]
                    }
                })
            }
            continue

        }
        // false
        if (token === 'f') {
            let value = token + input.pop() + input.pop() + input.pop() + input.pop()
            if (value === 'false') {
                result.push({
                    type: types.TYPE_BOOL,
                    value: false,
                    raw: value,
                    loc: {
                        start: [row, col],
                        end: [row, col + 4]
                    }
                })
            }
            continue
        }
        // null
        if (token === 'n') {
            let value = token + input.pop() + input.pop() + input.pop()
            if (value === 'null') {
                result.push({
                    type: types.TYPE_NULL,
                    value: null,
                    raw: value,
                    loc: {
                        start: [row, col],
                        end: [row, col + 3]
                    }
                })
            }
            continue
        }
        if (token === '\n') {
            row++
            col = 0
            continue
        }

        if (token === ' ') {
            col++
            continue
        }
        throw 'error token: ' + token

    }
    return result
}

module.exports = {
    tokenize, types
}