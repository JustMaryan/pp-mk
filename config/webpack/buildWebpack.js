import { buildDevServer } from './buildDevServer.js';
import { buildLoaders } from './buildLoaders.js';
import { buildPlugins } from './buildPlugins.js';
import { buildResolvers } from './buildResolvers.js';
import TerserPlugin from 'terser-webpack-plugin'; // Додайте імпорт для TerserPlugin


export function buildWebpack(options) {
    const isDev = options.mode === 'development';
    
    return {    
        mode: options.mode,
        entry: options.entry,
        output: {
            path: options.output,
            filename: 'js/[name].min.[contenthash].js',
            clean: true,
        },
        optimization: isDev ? {
            minimizer: [new TerserPlugin({
               extractComments: false,
            })]
         } : undefined,
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
          },
            resolve: buildResolvers(options),
        
        devtool: isDev && "inline-source-map",
        devServer: isDev ? buildDevServer(options) : undefined,
        
    }
}