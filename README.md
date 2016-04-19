# Cynic
Chainable type checking assertions in JavaScript

--------

## Usage

```javascript
if (Cynic.number(x)) performMaths(x);
```

```javascript
new Cynic(x)
    .number()
    .greater(10)
    .else(new Error("x must be a number greater than 10"));
```

```javascript
var result = new Cynic(x, "or").number().string().result;
//    ^-- true if x is a number or a string
```

## Facts

Cynic is:
 - Compiled to UMD
 - Written in TypeScript
 - Potentially an assertion library

## Development

If you want to play with Cynic's source code, [VSCode](https://code.visualstudio.com/) is highly recommended for the purpose. It's a great little cross-platform open-source IDE which integrates with TypeScript nicely.

 - Clone this project, run `npm install`, and open the project in VSCode
 - Hover your mouse cursor over the TypeScript source and enjoy 'IntelliSense' hints
 - Build with `Ctrl-Shift-B`
 - Test with `Ctrl-Shift-T`
