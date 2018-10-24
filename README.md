# json-parse
---
`json`转化工具, 可以将`json`转成成对象或者`ast`, 效果类似`JSON.parse`

### 脚本
- `npm run jest`: 测试
- `npm run build`: 打包

### API
- `tokenize(input:String):tokenList:List<Token>`: 将一个字符串分割成最小的词素
    ```javascript
    tokenize(`{"age":22}`)
    // 结果
    [
      {"loc": {"end": [1, 1], "start": [1, 1]}, "raw": "{", "type": "TYPE_LEFT_BRACE", "value": "{"}, 
      {"loc": {"end": [1, 6], "start": [1, 2]}, "raw": "\"age\"", "type": "TYPE_STRING", "value": "age"}, 
      {"loc": {"end": [1, 7], "start": [1, 7]}, "raw": ":", "type": "TYPE_COLON", "value": ":"}, 
      {"loc": {"end": [1, 9], "start": [1, 7]}, "raw": "22", "type": "TYPE_NUMBER", "value": 22}, 
      {"loc": {"end": [1, 10], "start": [1, 10]}, "raw": "}", "type": "TYPE_RIGHT_BRACE", "value": "}"}
    ]
    ```
- `parse(tokenList:List<Token>):ast:List<AstNode>`: 将词素集合转化成 ast
    ```javascript
     let ast = tokenize(`{"name":"lyxxxx"}`)
     parse(ast)
      // 结果
      {
         "children": [
           {  
              "key": {  
                "loc": {
                  "end": [1, 7], "start": [1, 2]
                },
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
           }], 
         "type": "Object"
      }
    ```
- `compile(ast:Array<AstNode>):Object|Array`: 将 ast 转化成对象或者数组
    ```javascript
        let ast = tokenize(`{"name":"lyxxxx","age":24,"isCool":true,"books":null,"articles":[{"name":"1"}]}`)
        ast = parse(ast)
        //compile(ast)
        {
          "age": 24, 
          "articles": [
            {"name": "1"}
          ], 
          "books": null, 
          "isCool": true, 
          "name": "lyxxxx"
        }
    ```
