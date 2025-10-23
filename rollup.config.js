// Plugins
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');
const serve = require('rollup-plugin-serve');
const terser = require('@rollup/plugin-terser');
const { rimraf } = require('rimraf');
const copy = require('rollup-plugin-copy');
const postcss = require('rollup-plugin-postcss');

// check if the mode is development
const isDevelopment = process.env.mode === 'development';
// the output dir
const outputDir = 'dist';

module.exports = {
  input: 'src/main.js',
  output: {
    format: 'iife',
    entryFileNames: '[name].js',
    assetFileNames: '[name][extname]',
    dir: outputDir
  },
  preserveEntrySignatures: 'allow-extension',
  watch: {
    buildDelay: 1000,
    clearScreen: false,
    include: 'src/**/*.{js,css}',
    exclude: 'node_modules/**'
  },
  plugins: [
    // resolve node_modules
    nodeResolve(),

    // transpile to es5
    babel({ babelHelpers: 'bundled' }),

    // css
    postcss({
      extract: true,
      minimize: true
    }),

    // minified bundle without html.
    isDevelopment ? null : terser(),

    // clear output directory.
    clear(outputDir),

    // copy public directory to output directory.
    copy({
      targets: [{ src: 'public/*', dest: outputDir }]
    }),

    // start dev server.
    isDevelopment
      ? serve({
          // Based on the Oort Cloud boundary: Diameter: approximately 2 light years, converted to kilometers: approximately 18,920,000,000,000 kilometers
          port: 18920,
          // Multiple folders to serve from
          contentBase: [outputDir],
          // set headers
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          // execute function after server has begun listening
          onListening: function (server) {
            const address = server.address();
            const host = address.address === '::' ? 'localhost' : address.address;
            // by using a bound function, we can access options as `this`
            const protocol = this.https ? 'https' : 'http';
            console.log(`Server listening at ${protocol}://${host}:${address.port}/`);
            console.log(`Open with ${protocol}://${host}:${address.port}/laboratory-solar-system.js`);
          }
        })
      : null
  ]
};

/**
 * clear output directory
 * @param {string|string[]} paths
 */
function clear(paths = 'dist') {
  return {
    name: 'clear',
    buildStart() {
      rimraf(paths);
    }
  };
}
