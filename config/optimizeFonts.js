import Fontmin from 'fontmin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Отримання __dirname у форматі ES модуля
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Налаштування шляху до вхідних і вихідних шрифтів
const srcPath = path.resolve(__dirname, '../src/client/fonts/*.*');
const destPath = path.resolve(__dirname, '../src/client/fonts');
const scssFile = path.resolve(__dirname, '../src/client/scss/base/assets/fonts/fonts.scss');

// Оптимізація шрифтів
const fontmin = new Fontmin()
  .src(srcPath)
  .dest(destPath)
  .use(Fontmin.otf2ttf()) // Перевірте, чи цей метод доступний
  .use(Fontmin.ttf2woff())
  .use(Fontmin.ttf2woff2());

fontmin.run((err, files) => {
  if (err) {
    console.error('Error optimizing fonts:', err);
    return;
  }

  console.log('Fonts optimized successfully!');

  // Отримання всіх шрифтів у директорії
  const fonts = fs.readdirSync(destPath).filter(file => /\.(woff|woff2|ttf|otf)$/.test(file));

  // Генерація @font-face для кожного шрифту
  const fontFaceMap = new Map();
  fonts.forEach(font => {
    const fontName = path.parse(font).name;
    let fontFaceRule = `
@font-face {
  font-family: '${fontName}';
  src: url('../fonts/${fontName}.woff2') format('woff2'),
       url('../fonts/${fontName}.woff') format('woff')`;

    // Додаємо формат TTF, якщо він доступний
    if (fs.existsSync(path.resolve(destPath, `${fontName}.ttf`))) {
      fontFaceRule += `,
       url('../fonts/${fontName}.ttf') format('truetype')`;
    }

    fontFaceRule += `;
  font-weight: normal;
  font-style: normal;
}`;
    
    if (!fontFaceMap.has(fontName)) {
      fontFaceMap.set(fontName, fontFaceRule);
    }
  });

  // Запис @font-face у SCSS файл
  const scssContent = Array.from(fontFaceMap.values()).join('\n');
  fs.writeFileSync(scssFile, scssContent, 'utf8');

  console.log('fonts.scss has been generated successfully!');
});
