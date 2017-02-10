# Example WebPack with Azure Functions

This is an example of using WebPack to bundle node modules for Node.js Azure Functions. This can result in large cold start improvements.

:construction: This is an example and not officially supported. This does not yet work in Azure production - it requires a feature that's coming out in a release later this month! Will update this message when released. :construction:

## Try the sample

1. Clone the repo: `git clone https://github.com/christopheranderson/azure-functions-webpack-sample.git`

2. Install dependencies: `npm install` (this includes webpack as dev dependency)

3. Build the project: `npm run build` (this run webpack)

4. Running locally: `func run HttpTriggerJS` (assumes you've installed local tools - `npm install -g azure-functions-cli`)

## How it works

1. `webpack.config.json` will build the `./index.js` file at the root of the project, which includes references to all your JS functions. This will load all your dependencies.

    ```
    // ./index.js
    var HttpTriggerJS = require('./HttpTriggerJS/index')
    var HTTPJS2 = require('./HTTPJS2/index')

    module.exports = {
        HttpTriggerJS: HttpTriggerJS,
        HTTPJS2: HTTPJS2
    }
    ```

2. When functions are run, the `function.json` contains a property `scriptFile` which points at the `./build/index.js` file and a `entryPoint` property that points at the method for that given Function. This ensures the right function is loaded and that libraries can be shared (important for connection pools, etc.).

    ```
    "scriptFile":"../build/index.js",
    "entryPoint":"HTTPJS2",
    ```

## Use it in your project

1. Add the `webpack.config.json` into the root of your Function App

2. Add `webpack` as a dev dependency and `"build":"webpack"` to your scripts section in your `package.json`

    ```
    "scripts": {
        "build": "webpack",
    },
    "devDependencies": {
        "webpack": "^2.2.1"
    }
    ```

3. Add an `index.js` file at the root of your Function App which references all your JS Functions as in the example

4. Add the `entryPoint` and `scriptFile` properties to each of your function's `function.json` files.


## License

[MIT](LICENSE)



