const fs = require('fs');
const {ConcatSource} = require('webpack-sources');

function UserScriptWebpackPlugin() {
  this.header = '';

  const packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const userscript = packageJSON.userscript || {};
  userscript.description = userscript.description || packageJSON.description;
  userscript.name = userscript.name || packageJSON.name;
  userscript.namespace = userscript.namespace || packageJSON.homepage || (packageJSON.repository && packageJSON.repository.url);
  userscript.version = userscript.version || packageJSON.version;

  this.header += '// ==UserScript==\n';
  Object.keys(userscript).sort().forEach(key => {
    Array.prototype.concat.apply([], userscript[key] && [userscript[key]]).forEach(value => {
      this.header += `// @${key} ${value}\n`;
    });
  });
  this.header += '// ==/UserScript==\n';
}

UserScriptWebpackPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', compilation => {
    compilation.plugin('after-optimize-chunk-assets', chunks => {
      chunks.forEach(chunk => {
        chunk.files.forEach(file => {
          compilation.assets[file] = new ConcatSource(this.header, compilation.assets[file]);
        });
      });
    });
  });
};

module.exports = UserScriptWebpackPlugin;
