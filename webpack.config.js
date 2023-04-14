const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    // get webpack mode
    const { mode = 'production' } = argv;
    
    // instantiate dotenv and get environment variables
    const envVars = dotenv.config({
        path: path.join(__dirname, `.env.${mode}`),
    }).parsed;

    // format environment variable object
    const formattedVars = Object.keys(envVars).reduce((acc, key) => {
        acc[`process.env.${key}`] = JSON.stringify(envVars[key])
        return acc
    }, {});
    
    return {
        context: __dirname,
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'build'),
        },
        target: 'web',
        mode: mode,
        devServer: {
            port: 3000,
            historyApiFallback: true,
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: 'ts-loader',
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    type: 'asset',
                },
            ],
        },
        devtool: (mode === 'development') ? 'eval-source-map' : false,
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
                favicon: path.resolve(__dirname, 'src', 'images', 'favicon.png'),
            }),
            new webpack.DefinePlugin(formattedVars),
        ],
    };
};
