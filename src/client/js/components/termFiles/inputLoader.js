export function inputCheck () {
    document.addEventListener('input', (event) => {
    const target = event.target;

    if (target.tagName === 'INPUT' && target.type === 'text') {
        if (target.value.trim() !== '') {
            target.classList.add('input-active'); // Додаємо клас, якщо інпут містить текст
        } else {
            target.classList.remove('input-active'); // Видаляємо клас, якщо інпут порожній
        }
    }
    });
}