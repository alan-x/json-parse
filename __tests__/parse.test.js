const parse = require('./../src/parse').parse
const tokenize = require('./../src/tokenize').tokenize

describe('parse', () => {

    test('{}', () => {
        let ast = tokenize(`{}`)
        expect(parse(ast)).toEqual(
            {"children": [], "type": "Object"}
        )
    })
    test(`{"name":"lyxxxx"}`, () => {
        let ast = tokenize(`{"name":"lyxxxx"}`)
        expect(parse(ast)).toEqual(
            {
                "children": [{
                    "key": {
                        "loc": {"end": [1, 7], "start": [1, 2]},
                        "raw": "\"name\"",
                        "type": "TYPE_STRING",
                        "value": "name"
                    },
                    "type": "Properties",
                    "value": {
                        "loc": {"end": [1, 16], "start": [1, 9]},
                        "raw": "\"lyxxxx\"",
                        "type": "TYPE_STRING",
                        "value": "lyxxxx"
                    }
                }], "type": "Object"
            }
        )
    })

    test(`{"age":11}`, () => {
        let ast = tokenize(`{"age":11}`)
        console.log(ast)
        expect(parse(ast)).toEqual(
            {
                "children": [{
                    "key": {
                        "loc": {"end": [1, 6], "start": [1, 2]},
                        "raw": "\"age\"",
                        "type": "TYPE_STRING",
                        "value": "age"
                    },
                    "type": "Properties",
                    "value": {
                        "loc": {"end": [1, 10], "start": [1, 7]},
                        "raw": "11",
                        "type": "TYPE_NUMBER",
                        "value": "11"
                    }
                }], "type": "Object"
            }
        )
    })

    test(`{"star":null}`, () => {
        let ast = tokenize(`{"star":null}`)
        expect(parse(ast)).toEqual(
            {
                "children": [{
                    "key": {
                        "loc": {"end": [1, 7], "start": [1, 2]},
                        "raw": "\"star\"",
                        "type": "TYPE_STRING",
                        "value": "star"
                    },
                    "type": "Properties",
                    "value": {
                        "loc": {"end": [1, 12], "start": [1, 9]},
                        "raw": "null",
                        "type": "TYPE_NULL",
                        "value": null
                    }
                }], "type": "Object"
            }
        )
    })

    test(`[1,null,false,"4",{"name":"lyxxxx"}]`, () => {
        let ast = tokenize(`[1,null,false,"4",{"name":"lyxxxx"}]`)
        console.log(ast)
        expect(parse(ast)).toEqual(
            {
                "children": [{
                    "loc": {"end": [1, 3], "start": [1, 1]},
                    "raw": "1,",
                    "type": "TYPE_NUMBER",
                    "value": "1,"
                }, {
                    "loc": {"end": [1, 8], "start": [1, 5]},
                    "raw": "null",
                    "type": "TYPE_NULL",
                    "value": null
                }, {
                    "loc": {"end": [1, 11], "start": [1, 7]},
                    "raw": "false",
                    "type": "TYPE_BOOL",
                    "value": false
                }, {
                    "loc": {"end": [1, 11], "start": [1, 9]},
                    "raw": "\"4\"",
                    "type": "TYPE_STRING",
                    "value": "4"
                }, {
                    "children": [{
                        "key": {
                            "loc": {"end": [1, 19], "start": [1, 14]},
                            "raw": "\"name\"",
                            "type": "TYPE_STRING",
                            "value": "name"
                        },
                        "type": "Properties",
                        "value": {
                            "loc": {"end": [1, 28], "start": [1, 21]},
                            "raw": "\"lyxxxx\"",
                            "type": "TYPE_STRING",
                            "value": "lyxxxx"
                        }
                    }], "type": "Object"
                }], "type": "Array"
            }
        )
    })

    test(`{"name":"lyxxxx","age":24,"isCool":true,"books":null,"articles":[{"name":"111"},{"name":"222"}]}`, () => {
        let ast = tokenize(`{"name":"lyxxxx","age":24,"isCool":true,"books":null,"articles":[{"name":"111"},{"name":"222"}]}`)
        expect(parse(ast)).toEqual(
            {
                "children": [{
                    "key": {
                        "loc": {"end": [1, 7], "start": [1, 2]},
                        "raw": "\"name\"",
                        "type": "TYPE_STRING",
                        "value": "name"
                    },
                    "type": "Properties",
                    "value": {
                        "loc": {"end": [1, 16], "start": [1, 9]},
                        "raw": "\"lyxxxx\"",
                        "type": "TYPE_STRING",
                        "value": "lyxxxx"
                    }
                }, {
                    "key": {
                        "loc": {"end": [1, 22], "start": [1, 18]},
                        "raw": "\"age\"",
                        "type": "TYPE_STRING",
                        "value": "age"
                    },
                    "type": "Properties",
                    "value": {
                        "loc": {"end": [1, 26], "start": [1, 23]},
                        "raw": "24,",
                        "type": "TYPE_NUMBER",
                        "value": "24,"
                    }
                }, {
                    "key": {
                        "loc": {"end": [1, 35], "start": [1, 28]},
                        "raw": "\"isCool\"",
                        "type": "TYPE_STRING",
                        "value": "isCool"
                    },
                    "type": "Properties",
                    "value": {
                        "loc": {"end": [1, 40], "start": [1, 37]},
                        "raw": "true",
                        "type": "TYPE_BOOL",
                        "value": true
                    }
                }, {
                    "key": {
                        "loc": {"end": [1, 45], "start": [1, 39]},
                        "raw": "\"books\"",
                        "type": "TYPE_STRING",
                        "value": "books"
                    },
                    "type": "Properties",
                    "value": {
                        "loc": {"end": [1, 50], "start": [1, 47]},
                        "raw": "null",
                        "type": "TYPE_NULL",
                        "value": null
                    }
                }, {
                    "key": {
                        "loc": {"end": [1, 58], "start": [1, 49]},
                        "raw": "\"articles\"",
                        "type": "TYPE_STRING",
                        "value": "articles"
                    },
                    "type": "Properties",
                    "value": {
                        "children": [{
                            "children": [{
                                "key": {
                                    "loc": {"end": [Array], "start": [Array]},
                                    "raw": "\"name\"",
                                    "type": "TYPE_STRING",
                                    "value": "name"
                                },
                                "type": "Properties",
                                "value": {
                                    "loc": {"end": [Array], "start": [Array]},
                                    "raw": "\"111\"",
                                    "type": "TYPE_STRING",
                                    "value": "111"
                                }
                            }], "type": "Object"
                        }, {
                            "children": [{
                                "key": {
                                    "loc": {"end": [Array], "start": [Array]},
                                    "raw": "\"name\"",
                                    "type": "TYPE_STRING",
                                    "value": "name"
                                },
                                "type": "Properties",
                                "value": {
                                    "loc": {"end": [Array], "start": [Array]},
                                    "raw": "\"222\"",
                                    "type": "TYPE_STRING",
                                    "value": "222"
                                }
                            }], "type": "Object"
                        }], "type": "Array"
                    }
                }], "type": "Object"
            }
        )
    })

})
