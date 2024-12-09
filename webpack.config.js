import path from 'path';
import { fileURLToPath } from 'url';
import { buildWebpack } from './config/webpack/buildWebpack.js';

// Отримуємо __filename і __dirname у форматі ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => {
    const options = {
        input: path.resolve(__dirname, 'src/client'),  // Абсолютний шлях до input
        output: path.resolve(__dirname, 'dist/client'),  // Абсолютний шлях до output
        //* Передаємо точки входу до javascript
        entry: {
            index: path.resolve(__dirname, 'src/client/js/index'),  // Абсолютний шлях до entry
            lib: path.resolve(__dirname, 'src/client/js/lib'),  // Абсолютний шлях до entry
            jsPractice: path.resolve(__dirname, 'src/client/js/js-practice'),
            links: path.resolve(__dirname, 'src/client/js/links'),
            term: path.resolve(__dirname, 'src/client/js/term'),
            auth: path.resolve(__dirname, 'src/client/js/auth'),
            lang: path.resolve(__dirname, 'src/client/js/lang'),
            profile: path.resolve(__dirname, 'src/client/js/profile'),
            // app: path.resolve(__dirname, 'src/js/app'),
        },
        //* Передаємо точки входу для html
        html: [
            {
                template: path.resolve(__dirname, 'src/client/index.html'),  // Абсолютний шлях до шаблону HTML
                filename: 'index.html',
                chunks: ['lang', 'index'], // Вказуємо необхідні js файли для підключення сторінки
            },
            {
                template: path.resolve(__dirname, 'src/client/pages/lib.html'),  // Абсолютний шлях до шаблону HTML
                filename: 'pages/lib.html',
                chunks: ['lib'], // Вказуємо необхідні js файли для підключення сторінки
            },
            {
                template: path.resolve(__dirname, 'src/client/pages/js-practice.html'),  // Абсолютний шлях до шаблону HTML
                filename: 'pages/js-practice.html',
                chunks: ['jsPractice'], // Вказуємо необхідні js файли для підключення сторінки
            },
            {
                template: path.resolve(__dirname, 'src/client/pages/links.html'),  // Абсолютний шлях до шаблону HTML
                filename: 'pages/links.html',
                chunks: ['links'], // Вказуємо необхідні js файли для підключення сторінки
            },
            {
                template: path.resolve(__dirname, 'src/client/pages/term.html'),  // Абсолютний шлях до шаблону HTML
                filename: 'pages/term.html',
                chunks: ['lang', 'term'], // Вказуємо необхідні js файли для підключення сторінки
            },
            {
                template: path.resolve(__dirname, 'src/client/pages/auth.html'),  // Абсолютний шлях до шаблону HTML
                filename: 'pages/auth.html',
                chunks: ['lang', 'auth'], // Вказуємо необхідні js файли для підключення сторінки
            },
            {
                template: path.resolve(__dirname, 'src/client/pages/profile.html'),  // Абсолютний шлях до шаблону HTML
                filename: 'pages/profile.html',
                chunks: ['lang', 'profile'], // Вказуємо необхідні js файли для підключення сторінки
            },
        ],
        fonts: path.resolve(__dirname, 'fonts'),
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
    };

    // Викликаємо buildWebpack з правильними параметрами
    const config = buildWebpack(options);

    return config;
}
