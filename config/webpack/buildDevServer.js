export function buildDevServer (options) {
    return {
        port: options.port ?? 3000,
        open: true,
        compress: true, // Стиснення gzip відповідей сервера
        hot: true, // Автоматичне оновлювлення файлів без повного перезавантаження сторінки
        host: 'local-ip',
        watchFiles: [ // Список файлів для відстеження змін та автоматичного перезавантаження
         `${options.input}/**/*.html`,
         `${options.input}/**/*.scss`,
         `${options.input}/img/**/*.*`
        ],
    }
}