import "../scss/index.scss";
import popup from "./components/popup.js";

// ** Functionality **
// Account logout
async function logoutAccount() {

  try {
    const response = await fetch('http://192.168.0.108:3000/profile/logout', {
        method: 'POST',
        credentials: 'include',  // Дозволяє передавати cookie
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      throw errorData;
    };

    const data = await response.json();

    if(data?.message) console.log(data?.message);
    document.location.reload();

  } catch (error) {

    // Console
    if (error?.message) console.log(error.message);

    // User Message
    const errorActions = {
      notFind: () => popup('error', {
        en: 'User not found.',
        uk: 'Користувача не знайдено.'
      }),
      unauthorizedUser: () => popup('error', {
        en: 'Unauthorized user.',
        uk: 'Неавторизований користувач.'
      }),
      oldData: () => popup('error', {
        en: 'False data.',
        uk: 'Хибні дані.'
      }),
      serverError: () => popup('error', {
        en: 'Server error. Reload the page, or contact technical support.',
        uk: 'Помилка сервера. Перезагрузість сторінку, або зверніться в тех підтримку.'
      }),
    }

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

// Account data upload.
async function getUserData() {
  try {
    const response = await fetch('http://192.168.0.108:3000/profile/info', {
      method: 'GET',
      credentials: 'include', // Додає cookies до запиту
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      const errorData = await response.json(); 
      throw errorData;
    }
    
    const data = await response.json();
    const accountImg = document.querySelector('[data-account-img]');
    const accountName = document.querySelector('[data-account-name]');
    const accountAuth = document.querySelector('[data-account-auth]');
    const profileLink = document.querySelector('[data-profile]');
    const languageValue = localStorage.getItem('lang');

    // Replacing the authorization button with an exit button
    if(accountAuth) {
       accountAuth.href = '#';
       accountAuth.addEventListener('click', logoutAccount);
    }
    if(languageValue === 'en' && accountAuth) {
      accountAuth.innerText = 'Sign out'; 
    } else {
      accountAuth.innerText = 'Вийти'; 
    }
    // Profile photo
    if (accountImg) {
      accountImg.src = data.img || 'img/HomePage/account.webp';
    }
    // Profile name
    if (accountName) {
      accountName.innerText = data.name || 'Account';
    }
    // Profile page
    if(profileLink) {
      profileLink.href = 'pages/profile.html' || '#';
    }
  } catch (error) {
    if (error?.message) console.log(error.message);
    if (error?.error && error?.error === 'serverError') popup('error', {
      en: 'Server error. Reload the page, or contact technical support.',
      uk: 'Помилка сервера. Перезагрузість сторінку, або зверніться в тех підтримку.'
    })
  }
}

// ** Events **
// Page loader
document.addEventListener('DOMContentLoaded', () => {
  getUserData();
  const links = document.querySelectorAll('a[data-json-path]');
  links.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault();
          const jsonPath = link.getAttribute('data-json-path');
          // Шлях до документу
          localStorage.setItem('jsonPath', jsonPath);
          window.location.href = link.href;
      });
  });
});

// Tabs for menu
document.querySelector('.wrapper').addEventListener('click', (e) => {
  const target = e.target;
  // ** Tabs
  // Tabs items
  if(target.closest('[data-tab-btn]')) {
    const tabContainer = document.querySelector('.catalog');
    const tabNumber = target.closest('[data-tab-btn]').dataset.tabBtn;
    const tabButtons = document.querySelectorAll('[data-tab-btn]');
    const tabContents = document.querySelectorAll('[data-tab]');

    tabContainer.classList.add('_active-tab-container');
    disablingTabs(tabButtons, tabContents); 
    activeTabs(tabButtons, tabContents, tabNumber);

  }
  // Tabs remove
  if (target.closest('[data-tab-remove]')) {
    const tabContainer = document.querySelector('.catalog');
    const tabButtons = document.querySelectorAll('[data-tab-btn]');
    const tabContents = document.querySelectorAll('[data-tab]');

    tabContainer.classList.remove('_active-tab-container');
    disablingTabs(tabButtons, tabContents);
  }

  function disablingTabs(buttons, tabs) {
    // remove ._active-tab-btn
    buttons.forEach(button => {
      if(button.classList.contains("_active-tab-btn")) {
        button.classList.remove("_active-tab-btn");
      };
    });
    // remove ._active-tab
    tabs.forEach(tab => {
      if(tab.classList.contains("_active-tab")) {
        tab.classList.remove("_active-tab");
      };
    });  
  }

  function activeTabs(buttons, tabs, number) {
    // Add ._active-tab-btn for number
    buttons.forEach(button => {
      if(number === button.dataset.tabBtn) {
        button.classList.add('_active-tab-btn');
      }
    })
    // Add ._active-tab for number
    tabs.forEach(tab => {
      if(number === tab.dataset.tab) {
        tab.classList.add('_active-tab');
      }
    })
  }
  // ** Message

})
