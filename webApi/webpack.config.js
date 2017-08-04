const webpack = require('webpack');
module.exports = function () {
    const path = __dirname;
    console.log("------------------------------------执行 Node 打包 path=" + path);
    return {
        entry: {
            app: './src/api/server.ts',
        },
        target: 'node',
        output: {
            path: path + '/build/server/',
            filename: 'server.js'
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        externals: [
            // 排除 node全局模块打包
            function (context, request, callback) {
                if (/^[a-z\-0-9]+$/.test(request)) {
                    return callback(null, 'commonjs ' + request);
                }
                callback();
            }
        ],
        // https://doc.webpack-china.org/configuration/node/
        node: {
            console: true,
            global: true,
            process: true,
            Buffer: true,
            __filename: false,
            __dirname: false,
            setImmediate: true
        },
        devtool: "source-map",
        module: {
            loaders: [{
                test: /\.ts$/,
                loader: 'ts-loader'
            }]
        },
        plugins: [
            //如果s 生成的 es6代码 这里会报错 webpack 暂时不支持压缩 es6
            // new webpack.optimize.UglifyJsPlugin({
            //     // 如果需要把 conslog 日志输出 等去除 请解开注释
            //     // warning: false,
            //     // mangle: true,
            //     // compress: {
            //     //     warnings: false,
            //     //     drop_debugger: true,
            //     //     drop_console: true
            //     // }
            // })
        ]
    };
}