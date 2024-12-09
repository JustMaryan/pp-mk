import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export function buildPlugins(options) {
    const isDev = options.mode === 'development';
    const isProd = options.mode === 'production';

    // Генерація плагінів для кожного HTML файлу з масиву options.html
    const plugins = options.html.map((page) => new HtmlWebpackPlugin({
        template: page.template,
        filename: page.filename,
        chunks: page.chunks,
    }));

    // Додаємо плагіни для всіх режимів
    plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${options.input}/img`,
                    to: `${options.output}/img`,
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                },
                {
                    from: `${options.input}/fonts`,
                    to: `${options.output}/fonts`,
                }
            ]
        })
    );

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].min.[contenthash].css', // Зберігаємо CSS файли в папці dist/css
            }),
        );
    }

    return plugins;
}

