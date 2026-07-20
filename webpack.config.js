const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src", "main.tsx"),

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.[contenthash].js",
        chunkFilename: "chunk.[contenthash].js",
        clean: true,
        publicPath: "/",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
        }),
    ],

    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                    priority: 10,
                },
            },
        },
    },

    performance: {
        maxAssetSize: 400000,
        maxEntrypointSize: 400000,
    },

    devServer: {
        port: 3000,
        historyApiFallback: true,
        open: true,
        hot: true,
    },
};