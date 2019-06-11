const webpack              = require( 'webpack' );
const path                 = require( 'path' );
const BrowserSyncPlugin    = require( 'browser-sync-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const isProduction  = process.env.NODE_ENV === 'production';
const isDevelopment = ! isProduction;

const miniCssExtractPluginLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        sourceMap: true
    }
};

const postCssLoader = {
    loader: 'postcss-loader',
    options: {
        sourceMap: true,
        plugins: [
            require( 'autoprefixer' ),
            require( 'cssnano' )
        ]
    }
};

const cssLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: true
    }
};

const sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: true
    }
};

const config = {
    devtool: 'source-map',
    entry: {
        main: './htdocs/wp-content/themes/starter-theme/assets/js/app.js',
    },
    output: {
        path: path.resolve( __dirname, './htdocs/wp-content/themes/starter-theme/assets/dist' ),
        filename: '[name].js'
    },
    externals: {

        // Set jQuery to be an external resource.
        'jquery': 'jQuery'
    },
    plugins: [

        // Provide jQuery instance for all modules.
        new webpack.ProvidePlugin({
            jQuery: 'jquery'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {

                        // Do not use the .babelrc configuration file.
                        babelrc: false,

                        // The loader will cache the results of the loader in node_modules/.cache/babel-loader.
                        cacheDirectory: true,

                        // Enable latest JavaScript features.
                        presets: [ '@babel/preset-env' ],

                        // The '@babel/plugin-transform-runtime' plugin tells babel to require the runtime instead of inlining it.
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-object-rest-spread'
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    miniCssExtractPluginLoader,
                    cssLoader,
                    postCssLoader,
                    sassLoader
                ]
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)(\?[a-z0-9=\.]+)?$/,
                use: {
                    loader: 'url-loader?name=../fonts/[name].[ext]',
                    options: {
                        limit: 4096
                    }
                }
            },
            {
                test: /\.(svg|gif|png|jpeg|jpg)(\?[a-z0-9=\.]+)?$/,
                use: {
                    loader: 'url-loader?name=../images/[name].[ext]',
                    options: {
                        limit: 4096
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};

if ( isDevelopment ) {
    config.plugins.push(

        // Browsersync config
        // Browse to https://localhost:3000 during development.
        new BrowserSyncPlugin(
            {
                open: false, // Set this to true if you want the project to automatically open in a browser
                proxy: 'https://localhost:8080', // Change this to your project url, e.g. localhost or projectname.test
                port: 3000,
                files: [
                    './htdocs/wp-content/themes/starter-theme/assets/dist/*.css',
                    './htdocs/wp-content/themes/starter-theme/assets/dist/*.js',
                    './htdocs/wp-content/themes/starter-theme/**/*.php',
                    'partials/**/*.dust'
                ]
            },
            {
                injectCss: true
            }
        )
    );
}

module.exports = config;