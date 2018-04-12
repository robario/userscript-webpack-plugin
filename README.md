# userscript-webpack-plugin
Webpack Plugin for generating UserScript

# Install

``` shell
$ npm i --save-dev userscript-webpack-plugin
```

# Usage

The plugin will generate an UserScript file for you that includes all your webpack bundles. Just add the plugin to your webpack config as follows:

``` javascript
const UserScriptWebpackPlugin = require('userscript-webpack-plugin');

module.exports = {
  ...
  plugins: [
    new UserScriptWebpackPlugin(),
  ],
};
```
