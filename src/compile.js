const astType = require('./../src/parse').astType
const types = require('./../src/tokenize').types
ast = []

function getObject(node) {
    let result = {}
    node.children.forEach(n => {
        const {type, key, value} = n
        switch (type) {
            case astType.TYPE_PROPERTY: {
                switch (value.type) {
                    case types.TYPE_NUMBER: {
                    }
                    case types.TYPE_STRING: {
                    }
                    case types.TYPE_NULL: {
                    }
                    case types.TYPE_BOOL: {
                        result[key.value] = value.value
                        break
                    }
                    case astType.TYPE_OBJECT: {
                        result[key.value] = getObject(value)
                        break
                    }
                    case astType.TYPE_ARRAY: {
                        result[key.value] = getArray(value)
                        break
                    }
                    default: {
                        throw "unknow ast type: " + value.type
                    }
                }
                break
            }
            default: {
                throw "unknow ast type: " + type
            }
        }
    })
    return result
}

function getArray(node) {
    let result = []
    node.children.forEach(n => {
        switch (n.type) {
            case types.TYPE_NUMBER: {
            }
            case types.TYPE_STRING: {
            }
            case types.TYPE_NULL: {
            }
            case types.TYPE_BOOL: {
                result.push(n.value)
                break
            }
            case astType.TYPE_OBJECT: {
                result.push(getObject(n))
                break
            }
            case astType.TYPE_ARRAY: {
                result.push(getArray(n))
                break
            }
            default: {
                throw "unknow type: " + n.type
            }
        }
    })
    return result

}

function compile(ast) {

    switch (ast.type) {
        case astType.TYPE_OBJECT: {
            return getObject(ast)
        }
        case astType.TYPE_ARRAY: {
            return getArray(ast)
        }
        default: {
            throw 'unknow type: ' + ast.type
        }
    }
}

module.exports = {
    compile
}