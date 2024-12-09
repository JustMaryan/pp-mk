function popup(type, message) {
    try { 
    const lang = localStorage.getItem('lang') || 'en';
    const isSuccess = type === 'success';
    const title = isSuccess ? (lang === 'en' ? 'Success' : 'УСПІШНО') : (lang === 'en' ? 'ERROR!' : 'ПОМИЛКА!');
    const defaultText = isSuccess 
        ? { en: 'The request was successfully completed.', uk: 'Запит успішно виконано.' } 
        : { en: 'Please try again to complete the request.', uk: 'Спробуйте ще раз, щоб виконати запит.' };
    const btnText = isSuccess ? (lang === 'en' ? 'Continue' : 'Продовжити') : (lang === 'en' ? 'Try Again' : 'Спробуйте знову');
    console.log(message)
    const popupHTML = `
        <div id="popup" class="popup ${isSuccess ? '' : '_popup-error'}">
            <div class="popup__block">
                <header class="popup__header">
                    <div class="popup__logo">
                        <img src="../img/PopUp/${isSuccess ? 'Success' : 'Error'}.jpg" alt="${title}" class="popup__img">
                    </div>
                    <h6 class="popup__title">${title}</h6>
                </header>
                <p class="popup__body">${message[lang]}</p>
                <footer class="popup__footer">
                    <p class="popup__text">${defaultText[lang]}</p>
                    <button class="popup__btn">${btnText}</button>
                </footer>
            </div>
        </div>`;
    
    if (!isSuccess && type !== 'error') return console.error('Invalid popup type');
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    document.querySelector('#popup .popup__btn').addEventListener('click', () => {
        document.querySelector('#popup').remove();
    });

    } catch (error) {
        console.log(error);
    }
}

export default popup;
