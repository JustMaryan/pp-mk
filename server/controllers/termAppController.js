const fs = require('fs');
const path = require('path');
const User = require('../models/userModel');
const TermStore = require('../models/termStore');

class TermAppController {
    async saveData(req, res) {
        const userId = req.userId;
        const store = req.body;

        try {
            // Контрольна перевірка користувача
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Користувача не знайдено.', type: 'notFind' });
            }

            // Збереження або оновлення даних
            const existingStore = await TermStore.findOne({ outUserId: userId });
            if (existingStore) {
                await TermStore.findByIdAndUpdate(
                    existingStore.id,
                    { store: store },
                    { new: true }
                );
            } else {
                const termStore = new TermStore({
                    outUserId: userId,
                    store: store
                });
                await termStore.save();
            }

            // Видалення зайвих фото
            const userDirName = userId.toString().slice(0, 6);
            const folderPath = path.join(__dirname, '..', '..', 'client', 'uploads', userDirName, 'term');
            // Перевірка наявності папки
            if (fs.existsSync(folderPath)) {
                const files = await fs.promises.readdir(folderPath);

                // Отримуємо назви файлів із об'єкта store
                const validFileNames = store.shopType.map(item => path.basename(item.img));
                    
                    // Перевіряємо кожну фотографію в папці
                for (const file of files) {
                    if (!validFileNames.includes(file)) {
                        const filePath = path.join(folderPath, file);
                        await fs.promises.unlink(filePath);
                        console.log(`Файл ${file} було видалено.`);
                    }
                }
            }

            res.status(200).json({ message: 'Дані успішно завантажено!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Помилка сервера', type: 'serverError', error: error.message });
        }
    }

    async loadData(req, res) {
        const userId = req.userId;

        try {
            // Контрольна перевірка користувача
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Користувача не знайдено.', type: 'notFind' });
            }

            // Пошук даних у базі
            const existingStore = await TermStore.findOne({ outUserId: userId });
            if (!existingStore) {
                return res.status(404).json({ message: 'Дані відсутні' });
            }

            res.status(200).json({ store: existingStore.store });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Помилка сервера', type: 'serverError', error: error.message });
        }
    }
}

module.exports = new TermAppController();
