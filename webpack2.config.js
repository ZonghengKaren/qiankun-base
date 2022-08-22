const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const resolve = (p) => path.resolve(__dirname, p)
const {VueLoaderPlugin}  = require('vue-loader/lib/index')
// 引入模块联邦
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
module.exports = {
    mode: 'production',
    entry: {
        main: './src/main2.js'
    },
    cache: {
        type: "memory" // filessystem memory
    },
    resolve: {
        extensions: [".vue", ".js", "json"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": resolve("src"),
            crypto: false,
            stream: false,
            assert: false,
            http: false
        }
    },
    output: {
        path: resolve('./dist'),
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    devServer: {
        port: 8036,
        // 配置允许跨域
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
                "X-Requested-With, content-type, Authorization",

        }
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new VueLoaderPlugin(),
        new ModuleFederationPlugin({
            name: 'lib_remote',
            filename: 'remoteEntry.js',
            exposes: {
                './A': './src/components/A.vue',
            },
            shared: ['vue']
        })
    ]
}