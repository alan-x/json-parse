const types = require('./../src/tokenize').types


const astType = {
    TYPE_OBJECT: 'Object',
    TYPE_PROPERTY: 'Properties',
    TYPE_ARRAY: 'Array'
}

let ast = []

function getObject() {
    let result = {
        type: astType.TYPE_OBJECT,
        children: []
    }
    while (ast.length) {
        let key = ast.pop()
        if (key.type === types.TYPE_STRING) {
            let value = ast.pop()
            if (value.type === types.TYPE_COLON) {
                value = ast.pop()
            }
            switch (value.type) {
                case types.TYPE_NUMBER: {

                }
                case types.TYPE_NULL: {

                }
                case types.TYPE_BOOL: {

                }
                case types.TYPE_STRING: {
                    let child = {
                        type: astType.TYPE_PROPERTY,
                        key: key,
                        value: value
                    }
                    result.children.push(child)
                    break
                }

                case types.TYPE_LEFT_BRACE: {
                    let child = {
                        type: astType.TYPE_PROPERTY,
                        key: key,
                        value: getObject()
                    }
                    result.children.push(child)
                    break
                }
                case types.TYPE_LEFT_BRACKET: {
                    let child = {
                        type: astType.TYPE_PROPERTY,
                        key: key,
                        value: getArray()
                    }
                    result.children.push(child)
                    break
                }

                default: {
                    break
                }
            }
        }
        else if (key.type === types.TYPE_RIGHT_BRACE) {
            return result
        }

    }
    throw "not found end of Object: }"
}

function getArray() {
    let result = {
        type: astType.TYPE_ARRAY,
        children: []
    }
    while (ast.length) {
        let a = ast.pop()
        switch (a.type) {
            case types.TYPE_NUMBER: {

            }
            case types.TYPE_NULL: {

            }
            case types.TYPE_BOOL: {

            }
            case types.TYPE_STRING: {
                result.children.push(a)
                break
            }

            case types.TYPE_LEFT_BRACE: {
                result.children.push(getObject())
                break
            }
            case types.TYPE_LEFT_BRACKET: {
                result.children.push(getArray())
                break
            }
            case types.TYPE_RIGHT_BRACKET: {
                return result
            }
        }
    }
    throw "not found end of Array: ]"
}

function parse(astFromUser) {
    ast = astFromUser.reverse()
    let a = ast.pop()
    switch (a.type) {
        case types.TYPE_LEFT_BRACE: {
            return getObject()
        }
        case types.TYPE_LEFT_BRACKET: {
            return getArray()
        }
        default: {
            throw 'json must be a Object/Array'
        }
    }
}


module.exports = {
    parse, astType
}