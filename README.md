
# 🧐 cynic

*simple async run-anywhere js testing framework*

- run in node, browser, puppeteer, or elsewhere
- tests are just async functions, return booleans to pass or fail
- es modules and commonjs are both supported
- no goofy assertion library: pure javascript, just return results or throw strings
- the examples here are in typescript, but of course you can go vanilla js

## get cynical and make a test suite

1. install cynic into your project

    ```sh
    npm install --save-dev cynic
    ```

2. define a test suite, like `cool.test.ts`

    ```ts
    import {Suite} from "cynic"
    export default <Suite>{
      "alpha system": {
        "can sum two numbers": async() => {
          const a = 1
          const b = 2
          return (a + b) === 3
        },
        "can sum three numbers": async() => {
          const a = 1
          const b = 2
          const c = 3
          return (a + b + c) === 6
        }
      },
      "bravo system": {
        "can subtract numbers": async() => {
          const a = 3
          const b = 1
          return (a - b) === 2
        },
        "can multiply numbers": async() => {
          const a = 2
          const b = 3
          return (a * b) === 6
        },
      }
    }
    ```

cynic's test suites are recursive

the async functions are tests

objects can be nested to organize more and more tests

async functions can return yet another suite of tests

## execute in node, browser, puppeteer, or anywhere else

### use the cynic command line tool

```sh
# run your tests in node
cynic node cool.test.js

# run your tests in browser
cynic browser cool.test.js

# run your tests in puppeteer (headless browser)
cynic puppeteer cool.test.js
```

optional arguments
- relevant to *all* environments
  - `--label="test suite"` — the report title
- relevant to *browser* and puppeteer *environments*
  - `--open=false` — true to prompt open your default browser
  - `--port=8021` — run the server on a different port
  - `--origin="http://localhost:8021"` — connect to the server via an alternative url (mind the port number!)
  - `--cynic-path=node_modules/cynic` — use an alternative path to the cynic library's root

if puppeteer isn't running properly, see puppeteer's [troubleshooting.md](https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md)

### or just execute your test suite manually

should anywhere you can execute es modules or commonjs

```ts
import {test} from "cynic"
import suite from "./cool.test.js"
;(async() => {

  // run the test suite
  const {report, ...stats} = await test("example suite", suite)

  // emit the report text to console
  console.log(report)

  // handle results programmatically
  if (stats.failed === 0) console.log("done")
  else console.log("failed!")

  // returns stats about the test run results
  console.log(stats)

})()
```

see which stats are available in the `Stats` interface in [interfaces.ts](./source/interfaces.ts)

## so what do the console reports look like?

- report of successful run (all tests returned true)

    ```
    example suite
    
      ▽ alpha system
        ✓ can sum two numbers
        ✓ can sum three numbers
      ▽ bravo system
        ✓ can subtract numbers
        ✓ can multiply numbers
    
    0 failed tests
    0 thrown errors
    4 passed tests
    4 total tests
    0.00 seconds
    ```

- report where one test had failed (returned false)

    ```
    example suite
    
      ▽ alpha system
        ✓ can sum two numbers
    
    ═══ ✘ can sum three numbers
    
      ▽ bravo system
        ✓ can subtract numbers
        ✓ can multiply numbers
    
    1 failed tests
    0 thrown errors
    3 passed tests
    4 total tests
    0.00 seconds
    ```

- report where one test failed by throwing an error (includes stack trace)

    ```
    example suite
    
      ▽ alpha system
        ✓ can sum two numbers
    
    ═══ ✘ can sum three numbers
    ――――― Error: unable to process numbers
           at can sum three numbers (.../cynic.test.js:4:15)
           at execute (.../execute.js:13:34)
           at test (.../test.js:4:38)
           at runNode (.../run-node.js:3:38)
    
      ▽ bravo system
        ✓ can subtract numbers
        ✓ can multiply numbers
    
    1 failed tests
    1 thrown errors
    3 passed tests
    4 total tests
    0.00 seconds
    ```

- report where one test failed, by throwing a *string* (not an error, no stack trace)

    ```
    example suite
    
      ▽ alpha system
        ✓ can sum two numbers
    
    ═══ ✘ can sum three numbers
    ――――― expected the result to be 6
    
      ▽ bravo system
        ✓ can subtract numbers
        ✓ can multiply numbers
    
    1 failed tests
    1 thrown errors
    3 passed tests
    4 total tests
    0.00 seconds
    ```

## hot tips

- use objects to group and nest your tests

    ```ts
    export default <Suite>{
      "nested tests": {
        "more nested": {
          "exceedingly nested": {
            "loltest": async() => true
          }
        }
      }
    }
    ```

- just throw strings as your assertions

    ```ts
    "assertions and expectations": async() => {
      const mystring = "abc"

      // the "spartan's assertion"
      if (!mystring.includes("b"))
        throw `expected mystring to include "b"`

      return true
    },
    ```

- or even make your own little assertion function/library

    ```ts
    // simple assert function definition
    function assert(
      condition: boolean,
      fail: string | Error = "failed assert"
    ) {
      if (!condition) throw fail
    }

    // using assert
    assert(mystring.includes("b"), "expected mystring to include 'b'")
    ```

- a suite can be an async function that returns another suite — making for a great way to set up a test suite

    ```ts
    export default <Suite>(async() => {
      const myFile = loadFile("myfile.json")
      return {
        "group of tests": {
          "my file exists": async() => {
            return !!myFile
          }
        }
      }
    })
    ```

## food for thought

- maybe instead of using throw's as assertions, we should make a special channel for it — some way to display all failed assertions together (instead only of the first)..? hmmph

- 🥃 chase moskal made this with open source love. please contribute!
