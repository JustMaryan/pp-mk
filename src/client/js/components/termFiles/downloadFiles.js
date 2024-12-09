import { storage } from "../../term.js";
//  Popup test
export function saveDocument () {
    const json = JSON.stringify(storage, null, 2); // Перетворюємо об'єкт у JSON
    const blob = new Blob([json], { type: 'application/json' }); // Створюємо Blob
    const url = URL.createObjectURL(blob); // Генеруємо URL для Blob
    const a = document.createElement('a'); // Створюємо елемент <a>
    a.href = url;
    a.download = 'storage.json'; // Встановлюємо ім'я файлу для скачування
    document.body.appendChild(a); // Додаємо елемент до DOM
    a.click(); // Імітуємо клік на посилання
    document.body.removeChild(a); // Видаляємо елемент з DOM
    URL.revokeObjectURL(url); // Звільняємо URL

    localStorage.removeItem('storesDates');
}