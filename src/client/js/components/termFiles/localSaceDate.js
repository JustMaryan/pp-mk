import { storage } from "../../term.js";

export function localSaveDate() {
    // Перетворюємо storage на JSON-рядок
    const storageString = JSON.stringify(storage);
    localStorage.setItem('storesDates', storageString);
}
