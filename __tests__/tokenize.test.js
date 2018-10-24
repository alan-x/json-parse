const tokenize = require('./../src/tokenize').tokenize

describe('tokenize', () => {

    test('{', () => {
        expect(tokenize(`{`)).toEqual(
            [{"loc": {"end": [1, 1], "start": [1, 1]}, "raw": "{", "type": "TYPE_LEFT_BRACE", "value": "{"}]
        )
    })

    test('}', () => {
        expect(tokenize(`}`)).toEqual(
            [{"loc": {"end": [1, 1], "start": [1, 1]}, "raw": "}", "type": "TYPE_RIGHT_BRACE", "value": "}"}]
        )
    })


    test('[', () => {
        expect(tokenize(`[`)).toEqual(
            [{"loc": {"end": [1, 1], "start": [1, 1]}, "raw": "[", "type": "TYPE_LEFT_BRACKET", "value": "["}]
        )
    })

    test(']', () => {
        expect(tokenize(`]`)).toEqual(
            [{"loc": {"end": [1, 1], "start": [1, 1]}, "raw": "]", "type": "TYPE_RIGHT_BRACKET", "value": "]"}]
        )
    })

    test(',', () => {
        expect(tokenize(`,`)).toEqual(
            [{"loc": {"end": [1, 1], "start": [1, 1]}, "raw": ",", "type": "TYPE_COMMA", "value": ","}]
        )
    })

    test(':', () => {
        expect(tokenize(`:`)).toEqual(
            [{"loc": {"end": [1, 1], "start": [1, 1]}, "raw": ":", "type": "TYPE_COLON", "value": ":"}]
        )
    })

    test('"', () => {
        try {
            tokenize(`"`)
        } catch (e) {
            expect(e).toBe(`error: (1,1), just one '"'`)

        }
    })
    test(`""`, () => {
        expect(tokenize(`""`)).toEqual(
            [{"loc": {"end": [1, 2], "start": [1, 1]}, "raw": "\"\"", "type": "TYPE_STRING", "value": ""}]
        )
    })

    test(`"name"`, () => {
        expect(tokenize(`"name"`)).toEqual(
            [{"loc": {"end": [1, 6], "start": [1, 1]}, "raw": "\"name\"", "type": "TYPE_STRING", "value": "name"}]
        )
    })
    test(`true`, () => {
        expect(tokenize(`true`)).toEqual([{
            "loc": {"end": [1, 4], "start": [1, 1]},
            "raw": "true",
            "type": "TYPE_BOOL",
            "value": true
        }])
    })
    test(`false`, () => {
        expect(tokenize(`false`)).toEqual([{
            "loc": {"end": [1, 5], "start": [1, 1]},
            "raw": "false",
            "type": "TYPE_BOOL",
            "value": false
        }])
    })
    test(`null`, () => {
        expect(tokenize(`null`)).toEqual([{
            "loc": {"end": [1, 4], "start": [1, 1]},
            "raw": "null",
            "type": "TYPE_NULL",
            "value": null
        }])
    })

    test(`22`, () => {
        expect(tokenize(`22`)).toEqual(
            [{"loc": {"end": [1, 2], "start": [1, 0]}, "raw": "22", "type": "TYPE_NUMBER", "value": "22"}]
        )
    })
    test(`{"age":22}`, () => {
    })
    expect(tokenize(`{"age":22}`)).toEqual(
        [{"loc": {"end": [1, 1], "start": [1, 1]}, "raw": "{", "type": "TYPE_LEFT_BRACE", "value": "{"}, {"loc": {"end": [1, 6], "start": [1, 2]}, "raw": "\"age\"", "type": "TYPE_STRING", "value": "age"}, {"loc": {"end": [1, 7], "start": [1, 7]}, "raw": ":", "type": "TYPE_COLON", "value": ":"}, {"loc": {"end": [1, 9], "start": [1, 7]}, "raw": "22", "type": "TYPE_NUMBER", "value": 22}, {"loc": {"end": [1, 10], "start": [1, 10]}, "raw": "}", "type": "TYPE_RIGHT_BRACE", "value": "}"}]
    )

    test(`object`, () => {
        expect(tokenize(`
        {
            "name":"lyxxxx",
            "age":24,
            "isCool":true,
            "star":null,
            "index":[1,2,3,4]
        }`)).toEqual(
            [{
                "loc": {"end": [2, 17], "start": [2, 17]},
                "raw": "{",
                "type": "TYPE_LEFT_BRACE",
                "value": "{"
            }, {
                "loc": {"end": [3, 30], "start": [3, 25]},
                "raw": "\"name\"",
                "type": "TYPE_STRING",
                "value": "name"
            }, {
                "loc": {"end": [3, 31], "start": [3, 31]},
                "raw": ":",
                "type": "TYPE_COLON",
                "value": ":"
            }, {
                "loc": {"end": [3, 39], "start": [3, 32]},
                "raw": "\"lyxxxx\"",
                "type": "TYPE_STRING",
                "value": "lyxxxx"
            }, {
                "loc": {"end": [3, 40], "start": [3, 40]},
                "raw": ",",
                "type": "TYPE_COMMA",
                "value": ","
            }, {
                "loc": {"end": [4, 29], "start": [4, 25]},
                "raw": "\"age\"",
                "type": "TYPE_STRING",
                "value": "age"
            }, {
                "loc": {"end": [4, 30], "start": [4, 30]},
                "raw": ":",
                "type": "TYPE_COLON",
                "value": ":"
            }, {
                "loc": {"end": [4, 31], "start": [4, 30]},
                "raw": "",
                "type": "TYPE_STRING",
                "value": ""
            }, {
                "loc": {"end": [5, 32], "start": [5, 25]},
                "raw": "\"isCool\"",
                "type": "TYPE_STRING",
                "value": "isCool"
            }, {
                "loc": {"end": [5, 33], "start": [5, 33]},
                "raw": ":",
                "type": "TYPE_COLON",
                "value": ":"
            }, {
                "loc": {"end": [5, 37], "start": [5, 34]},
                "raw": "true",
                "type": "TYPE_BOOL",
                "value": true
            }, {
                "loc": {"end": [5, 35], "start": [5, 35]},
                "raw": ",",
                "type": "TYPE_COMMA",
                "value": ","
            }, {
                "loc": {"end": [6, 30], "start": [6, 25]},
                "raw": "\"star\"",
                "type": "TYPE_STRING",
                "value": "star"
            }, {
                "loc": {"end": [6, 31], "start": [6, 31]},
                "raw": ":",
                "type": "TYPE_COLON",
                "value": ":"
            }, {
                "loc": {"end": [6, 35], "start": [6, 32]},
                "raw": "null",
                "type": "TYPE_NULL",
                "value": null
            }, {
                "loc": {"end": [6, 33], "start": [6, 33]},
                "raw": ",",
                "type": "TYPE_COMMA",
                "value": ","
            }, {
                "loc": {"end": [7, 31], "start": [7, 25]},
                "raw": "\"index\"",
                "type": "TYPE_STRING",
                "value": "index"
            }, {
                "loc": {"end": [7, 32], "start": [7, 32]},
                "raw": ":",
                "type": "TYPE_COLON",
                "value": ":"
            }, {
                "loc": {"end": [7, 33], "start": [7, 33]},
                "raw": "[",
                "type": "TYPE_LEFT_BRACKET",
                "value": "["
            }, {
                "loc": {"end": [7, 36], "start": [7, 33]},
                "raw": "2",
                "type": "TYPE_STRING",
                "value": "2"
            }, {
                "loc": {"end": [7, 39], "start": [7, 36]},
                "raw": "4",
                "type": "TYPE_STRING",
                "value": "4"
            }, {"loc": {"end": [8, 17], "start": [8, 17]}, "raw": "}", "type": "TYPE_RIGHT_BRACE", "value": "}"}
            ]
        )
    })
})
