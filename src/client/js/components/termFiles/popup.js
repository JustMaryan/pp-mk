// Popup

// Попап в проекті - єдине відкно на сторінці з можливістю передачі контенту в нього
// За замовченням приховане. Показується при добавленні 'popup-active' на html тег
export function popup(innerContent = '') {
    const popuBody = document.querySelector('#popup');
    const content = document.querySelector('#popup-content');

    // Remove, reset buttons
    const actionPopup = (e) => {
        const target = e.target; 
        if (target.closest('.popup__btn-remove')) document.documentElement.classList.remove('popup-active');
        else if (target.closest('.popup__btn-reset')) {
            content.querySelectorAll('input').forEach(input => input.value = '');
            content.querySelectorAll('select').forEach(select => select.selectedIndex = -1);
        }
    };


    // Видаляємо попередній обробник і додаємо новий
    popuBody.removeEventListener('click', actionPopup);
    popuBody.addEventListener('click', actionPopup);

    // Добавляємо контент, підключаємо стилі
    content.innerHTML = innerContent;
    document.documentElement.classList.add('popup-active');

}
