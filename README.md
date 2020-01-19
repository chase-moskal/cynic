
# 🧐 cynic

*dead-simple async run-anywhere js testing framework*

- tests are just async functions, return booleans to pass or fail
- run in node, browser, puppeteer, or elsewhere
- es modules and commonjs are both supported
- no goofy assertion library: just return results or throw strings
- examples here are in typescript, but you can go vanilla js

## get cynical and make a test suite

1. install cynic into your project

    ```sh
    npm install --save-dev cynic
    ```

2. define a test suite, like `cool.test.ts`

    ```js
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

## execute your cynical test suite anywhere

- node

    ```js
    import suite from "./cool.test.js"
    import {runNode} from "cynic/dist/run-node.js"
    runNode("example suite, node", suite)
    ```

- browser

    ```js
    import suite from "./cool.test.js"
    import {runBrowser} from "cynic/dist/run-browser.js"
    runBrowser("example suite, browser", suite)
    ```

- puppeteer (connects to the above browser page)

    ```js
    import {runPuppeteer} from "cynic/dist/run-puppeteer.js"
    runPuppeteer({
      port: 8021,
      url: `http://localhost:8021/`
    })
    ```

- anywhere that you can execute es modules or commonjs

    ```js
    import {test} from "cynic"
    import suite from "./cool.test.js"
    ;(async() => {
      const label = "example suite"

      // run the test suite
      const {report, ...stats} = await test(label, suite)

      // emit the report text to console
      console.log(report)

      // handle results programmatically
      if (stats.failed === 0) console.log("done")
      else console.log("failed!")

      // example of the stats you get
      console.log(stats)
       //> {
       //>   total: 7,
       //>   failed: 2,
       //>   duration: 16, // milliseconds
       //>   errors: ["expected result to be 6"],
       //> }

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

    ```js
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

    ```js
    "assertions and expectations": async() => {
      const mystring = "abc"

      // the "spartan's assertion"
      if (!mystring.includes("b"))
        throw `expected mystring to include "b"`

      return true
    },
    ```

- or even make your own little assertion function/library

    ```js
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

- you might want to return your suite from an async function to do some setup

## food for thought

- maybe instead of using throw's as assertions, we should make a special channel for it -- some way to display all failed assertions instead only of the first.. hmmph

- 🥃 chase moskal made this with open source love. please contribute!
