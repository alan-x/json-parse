const parse = require('./../src/parse').parse
const tokenize = require('./../src/tokenize').tokenize
const compile = require('./../src/compile').compile

describe('compile', () => {

    test('{}', () => {
        let ast = tokenize(`{}`)
        ast = parse(ast)
        expect(compile(ast)).toEqual(
            {}
        )
    })
    test(`{"name":"lyx"}`, () => {
        let ast = tokenize(`{"name":"lyx"}`)
        ast = parse(ast)
        expect(compile(ast)).toEqual(
            {name: "lyx"}
        )
    })
    test(`{"age":22}`, () => {
        let ast = tokenize(`{"age":22}`)
        ast = parse(ast)
        expect(compile(ast)).toEqual(
            {age: 22}
        )
    })

    test(`{"star":null}`, () => {
        let ast = tokenize(`{"star":null}`)
        ast = parse(ast)
        expect(compile(ast)).toEqual(
            {star: null}
        )
    })

    test(`{"isCool":true}`, () => {
        let ast = tokenize(`{"isCool":true}`)
        ast = parse(ast)
        expect(compile(ast)).toEqual(
            {"isCool": true}
        )
    })

    test(`{"name":"lyxxxx","age":24,"isCool":true,"books":null}`, () => {
        let ast = tokenize(`{"name":"lyxxxx","age":24,"isCool":true,"books":null}`)
        ast = parse(ast)
        expect(compile(ast)).toEqual(
            {"age": 24, "books": null, "isCool": true, "name": "lyxxxx"}
        )
    })

    test(`{"articles":{"name":"1"}}`, () => {
        let ast = tokenize(`{"articles":{"name":"1"}}`)
        ast = parse(ast)
        expect(compile(ast)).toEqual(
            {"articles": {"name": "1"}}
        )
    })

    test(`{"articles":[1,2,3,4]}`, () => {
        let ast = tokenize(`{"articles":[1,2,3,4]}`)
        ast = parse(ast)
        expect(compile(ast)).toEqual(
            {"articles": [1, 2, 3, 4]}
        )
    })

    test(`[]`, () => {
        let ast = tokenize(`[]`)
        ast = parse(ast)
        expect(compile(ast)).toEqual(
            []
        )
    })

    test(`[1,null,false,"4",{"name":"lyxxxx"}]`, () => {
        let ast = tokenize(`[1,null,false,"4",{"name":"lyxxxx"}]`)
        ast = parse(ast)
        expect(compile(ast)).toEqual(
            [1, null, false, "4", {"name": "lyxxxx"}]
        )
    })


    test(`[{"name":"1"},{"name":"1"},{"name":"1"},{"name":"1"}]`, () => {
        let ast = tokenize(`[{"name":"1"},{"name":"1"},{"name":"1"},{"name":"1"}]`)
        ast = parse(ast)
        expect(compile(ast)).toEqual(
            [{"name": "1"}, {"name": "1"}, {"name": "1"}, {"name": "1"}]
        )
    })
    test(`[[1,2,3],[4,5,6]]`, () => {
        let ast = tokenize(`[[1,2,3],[4,5,6]]`)
        ast = parse(ast)
        expect(compile(ast)).toEqual(
            [[1, 2, 3], [4, 5, 6]]
        )
    })

})
