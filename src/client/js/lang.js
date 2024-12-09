import en from '../lang/en.json';
import uk from '../lang/uk.json';

// Об'єднання перекладів
const translations = { en, uk };

// Ініціалізація обраної мови
const savedLang = localStorage.getItem('lang') || 'en'; // Якщо в localStorage нічого немає, то 'en'
updateLanguage(savedLang);

// Додавання обробника для кнопок вибору мови
document.querySelector('.lang').addEventListener('click', e => {
    const lang = e.target.closest('[data-lang-btn]')?.dataset.langBtn;
    if (lang && translations[lang]) {
        // Оновлення активної мови
        updateLanguage(lang);

        // Збереження мови в localStorage
        localStorage.setItem('lang', lang);
    }
});

// Функція для оновлення мови
function updateLanguage(lang) {
    // Активуємо відповідну кнопку
    document.querySelectorAll('[data-lang-btn]').forEach(btn =>
        btn.classList.toggle('_active-lang', btn.dataset.langBtn === lang)
    );

    // Змінюємо текст елементів
    document.querySelectorAll('[data-lang]').forEach(el => {
        el.textContent = translations[lang][el.dataset.lang] || el.textContent;
    });
}
