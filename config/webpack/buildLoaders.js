import MiniCssExtractPlugin from "mini-css-extract-plugin";


export function buildLoaders(options) {
    const isDev = options.mode === 'development';

    const cssLoader =  { 
        test: /\.css$/i, 
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader, 
            {
                loader: "css-loader",
                options: {
                    sourceMap: isDev,
                    // Додаткові опції
                },
            }
        ]
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [ 
            isDev ? "style-loader" : MiniCssExtractPlugin.loader, 
            "css-loader", 
            {
                loader: "sass-loader",
                options: {
                    sassOptions: {
                        quiet: true, // Приглушити попередження
                    },
                },
            }
        ]
    }
    

    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }
    
    const imgLoader = { 
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        },
    }

    const fontsLoader = {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // Регулярний вираз для шрифтів
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      }
    

    return [cssLoader, scssLoader, imgLoader, fontsLoader, tsLoader];
}
