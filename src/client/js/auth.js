import "../scss/auth.scss";
import popup from "./components/popup.js";

// Покращена функція selectorClass
function selectorClass(selector, change = 'false', changeClass = '') {
    const element = document.querySelector('.' + selector);
    
    if (!element) {
        console.error(`Елемент із селектором "${selector}" не знайдено.`);
        return;
    }

    // Логіка для додавання, видалення або перемикання класів
    const actions = {
        remove: () => changeClass ? element.classList.remove(changeClass) : element.classList.remove(selector),
        toggle: () => changeClass ? element.classList.toggle(changeClass) : element.classList.toggle(selector),
        add: () => changeClass ? element.classList.add(changeClass) : element.classList.add(selector)
    };

    if (actions[change]) {
        actions[change]();
    }
}

// Основний обробник
async function handleFormSubmission(form, url) {
    const formData = {
        username: form.querySelector('[data-form="login"]').value.trim(),
        password: form.querySelector('[data-form="password"]').value.trim(),
    };

    if (form.querySelector('[data-form="email"]')) formData.email = form.querySelector('[data-form="email"]').value.trim();
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        // Перевірка статусу відповіді
        if (!response.ok) {
            const errorData = await response.json(); 
            throw errorData;
        }

        const data = await response.json();
        
        if (data?.message) console.log(data.message);
        popup('success', { en: 'Operation was successful.', uk: "Операція пройшла успішно." });
        window.location.href = '/index.html';

    } catch (error) {
        // Console message
        if (error?.message) console.log(error.message);
        // User message
        selectorClass('_error', 'remove');
        const errorActions = {
            usernameSymbol: () => form.querySelector('[data-form="login"]').parentElement.classList.add('_error'),
            passwordLength: () => form.querySelector('[data-form="password"]').parentElement.classList.add('_error'),
            userExists: () => popup('error', {
                en: 'A user with that name already exists.',
                uk: 'Користувач з таким іменем вже існує.'
            }),
            incorrectName: () => form.querySelector('[data-form="login"]').parentElement.classList.add('_error'),
            incorrectPassword: () => form.querySelector('[data-form="password"]').parentElement.classList.add('_error'),
            serverError: () => popup('error', {
                en: 'Server Error. Please try again.',
                uk: 'Помилка сервера, спробуйте ще раз.'
            })
        };
        if (error?.error && errorActions[error.error]) {
            errorActions[error.error]();
        } else {
            popup('error', {
                en: 'Unknown error type. Please try again.',
                uk: 'Невідомий тип помилки. Будь ласка спробуйте ще раз.'
            });
        }
    }
}

// Слухачі подій для форм
document.querySelector('#authForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const lang = localStorage.getItem('lang') || 'en';
    handleFormSubmission(event.target, 'http://192.168.0.108:3000/profile/login');
});

document.querySelector('#registrForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const lang = localStorage.getItem('lang') || 'en';
    handleFormSubmission(event.target, 'http://192.168.0.108:3000/profile/register');
});

document.body.addEventListener('click', function(e) {
    const target = e.target;
    const body = document.body;
    if(target.closest('[data-btn]')) {
        body.classList.toggle('_change-bg')
    }
});
