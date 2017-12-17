const webpackMerge = require('webpack-merge');
const webpackConfigBase = require('./webpack.config.base.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pathsHelper = require('./lib/paths-helper');

module.exports = function () {
  return webpackMerge(webpackConfigBase(), {
    output: {
      publicPath: '/assets'
    },
    module: {
      rules: [
        {
          test: /\.pcss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: 'inline',
                  plugins: function () {
                    return [
                      require('postcss-import'),
                      require('postcss-reporter')(),
                      require('postcss-custom-properties'),
                      require('postcss-custom-selectors'),
                      require('postcss-calc'),
                      require('postcss-functions')({
                        functions: {
                          neg(value) {
                            return `-${value}`;
                          }
                        }
                      }),
                      require('postcss-custom-media'),
                      require('postcss-color-function'),
                      require('postcss-selector-not'),
                      require('postcss-pseudoelements'),
                      require('postcss-replace-overflow-wrap'),
                      require('postcss-apply'),
                      require('postcss-font-family-system-ui'),
                      require('postcss-nesting'),
                      require('postcss-remove-root'),
                      require('css-mqpacker')({
                        sort: true
                      }),
                      require('autoprefixer'),
                      require('postcss-style-guide')({
                        project: 'Gloria',
                        dest: 'dist/assets/styleguide.html',
                        theme: 'styleguide',
                        themePath: 'styleguide',
                        showCode: true,
                      }),
                    ];
                  }
                }
              }
            ]
          })
        }
      ]
    },
    devServer: {
      contentBase: pathsHelper('static'),
      host: '0.0.0.0',
      port: 8080,
      disableHostCheck: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: true
      },
      stats: {
        children: false
      }
    },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  })
};
