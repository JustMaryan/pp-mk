const sharp = require('sharp'); // Для оптимізації зображень
const path = require('path');
const fs = require('fs');

class UploadFiles {
    async uploadPic(req, res) {
        const userId = req.userId;
        try {
            const file = req.file;  // Отримуємо файл з запиту

            // Генерація шляху для збереження файлу
            const userDirName = userId.toString().slice(0, 6);
            const fileName = `image_${Date.now()}.webp`;
            const outputPath = path.join(__dirname, '..', '..', 'client', 'uploads', userDirName, 'term', fileName);

            // Створюємо директорії для збереження файлу
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });

            // Оптимізація зображення за допомогою sharp
            await sharp(file.path)
                .webp({ quality: 80 })
                .toFile(outputPath);

            // Очищення тимчасового файлу після обробки
            fs.unlinkSync(file.path);
            

            // Повертаємо посилання на збережене зображення
            const imageLink = `../uploads/${userDirName}/term/${fileName}`;
            res.status(200).json({ link: imageLink });
        } catch (error) {
            console.error("Помилка при завантаженні зображення:", error);
            res.status(500).json({ error: 'Не вдалося обробити зображення' });
        }
    }
}

module.exports = new UploadFiles();
