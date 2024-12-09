import html from "./html.js";

export function addElement(cribElement, buttonValue) {
    // Додає HTML-код до cribElement на основі значення buttonValue.
    cribElement.insertAdjacentHTML('beforeend', html[buttonValue]);
}


export function order(cribItems, button) {
    // Увімкнення або вимкнення можливості сортування елементів cribItems за допомогою jQuery UI sortable.
    const checkAuditJQ = $(button.querySelector('[data-order-check]')); // Отримує jQuery елемент кнопки сортування.
    const cribItemsJQ = $(cribItems); // Отримує jQuery елемент cribItems.
    const isChecked = checkAuditJQ.prop('checked'); // Перевіряє, чи встановлено прапорець сортування.

    if (isChecked) {
        cribItemsJQ.sortable({}); // Увімкнення сортування.
        button.classList.add('_order-check'); // Додає клас, що вказує на увімкнене сортування.
    } else {
        button.classList.remove('_order-check'); // Видаляє клас сортування.
        if (cribItemsJQ.data('ui-sortable')) { // Перевіряє, чи є активне сортування.
            cribItemsJQ.sortable('destroy'); // Вимикає сортування.
        }
    }
}

export function clear(items) {
    items.innerHTML = '';
}

// export function save() {
//     // Функція для збереження поточного стану елементів crib в JSON файл.
//     const cribBody = document.querySelector('[data-body]');
//     const cribChapter = [...cribBody.querySelectorAll('[data-chapter]')]; // Перетворює NodeList в масив.

//     // Перебирає всі контейнери crib і викликає edit(), якщо контейнер в режимі редагування.
//     cribChapter.forEach(chapter => {
//         let cribItems = chapter.querySelector('[data-crib-items]');
//         if(chapter.classList.contains('_edit-chapter')) {
//             edit(chapter);
//         }
//     });

//     localStorage.clear(); // Очищує LocalStorage.

//     const newCrib = { newDocument: assignIDsAndReturnHTML(cribBody) }; // Створює об'єкт newCrib з HTML вмістом cribBody.
//     newCrib.newMenu = generateMenuHTML(cribBody); // Додає згенерований HTML меню до об'єкта newCrib.

//     downloadJSON(newCrib, 'cribLibrary.json'); // Завантажує JSON файл з новим вмістом crib.
// }

// function assignIDsAndReturnHTML(cribBody) {
//     // Присвоює унікальні ID кожному заголовку і повертає HTML вміст cribBody.
//     [...cribBody.querySelectorAll('[data-crib-content="title"]')].forEach((title, i) => {
//         title.id = `${i}`; // Присвоює ID кожному елементу з атрибутом data-crib-content="title".
//     });
//     return cribBody.innerHTML;
// }

// function generateMenuHTML(cribBody) {
//     // Генерує HTML меню з елементів cribBody.
//     const menuContainer = document.createElement('div');
//     const cribMenuItems = [...cribBody.querySelectorAll('[data-chapter]')];

//     cribMenuItems.forEach(item => {
//         const cribMainTitle = item.querySelector('[data-crib-content="main-title"]').innerText; // Отримує головний заголовок кожного контейнера crib.
//         const cribTitles = [...item.querySelectorAll('[data-crib-content="title"]')]; // Отримує всі заголовки в контейнері.

//         const newItem = document.createRange().createContextualFragment(html.menu); // Створює новий елемент меню з HTML-шаблону.
//         newItem.querySelector('[data-menu="title"]').innerText = cribMainTitle; // Встановлює головний заголовок у меню.

//         const cribMenuLinks = newItem.querySelector('[data-menu="items"]');
//         cribTitles.forEach(title => {
//             cribMenuLinks.insertAdjacentHTML('beforeend', `
//                 <li class="menu__item"><a href="#${title.id}" class="menu__link">${title.innerText}</a></li>`
//             ); // Додає посилання для кожного заголовку.
//         });

//         menuContainer.appendChild(newItem); // Додає новий елемент меню до контейнера меню.
//     });

//     return menuContainer.innerHTML; // Повертає HTML вміст меню.
// }

// function downloadJSON(data, filename) {
//     // Завантажує JSON файл з даними data під назвою filename.
//     const jsonCrib = JSON.stringify(data, null, 2); // Перетворює об'єкт даних у JSON строку.
//     const blob = new Blob([jsonCrib], { type: 'application/json' }); // Створює Blob з JSON даними.
//     const url = URL.createObjectURL(blob); // Створює тимчасовий URL для Blob.
//     const a = document.createElement('a'); // Створює HTML елемент <a> для завантаження файлу.
//     a.href = url;
//     a.download = filename;
//     a.click(); // Імітує клік для завантаження файлу.
//     URL.revokeObjectURL(url); // Відкликає тимчасовий URL після завантаження.
//     localStorage.removeItem('cribContent');
// }


export function remove(cribContainer, cribItem) {
    // Видаляє вказаний елемент cribItem або контейнер cribContainer, якщо cribItem не вказано.
    cribItem ? cribItem.remove() : cribContainer.remove();
}

export function localSave(cribContainer) {
    // Зберігає вміст cribContainer у LocalStorage.
    localStorage.setItem('cribContent', cribContainer.outerHTML);
}
