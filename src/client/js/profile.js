import "../scss/profile.scss";
import popup from "./components/popup.js";


// ** Functional **
async function deleteAcoount () {
    try{    
        const response = await fetch('http://192.168.0.108:3000/profile/delete', {
            method: 'DELETE',
            credentials: 'include'
        })

        // Error
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }

        // Success
        const data = await response.json();
        if(data?.message) console.log(data?.message);
        popup('success', {
            uk: 'Аккаунт видалено.',
            en: 'Account deleted.'
        })
        document.location.href = '../index.html';

    } catch(error) {

        if (error?.message) console.log(error.message);

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

async function updateAcoount () {
    const formData = {
      username: document.querySelector('[data-account="name"]').value.trim(),
      email: document.querySelector('[data-account="email"]').value.trim(),
      age: document.querySelector('[data-account="age"]').value.trim(),
    }

    try {
        const response = await fetch('http://192.168.0.108:3000/profile/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })

        // Error
        if (!response.ok) {
            const errorData = await response.json(); 
            throw errorData;
        };
          
        // Success
        const data = await response.json();
        if(data?.message) console.log(data?.message);
        popup('success', {
            uk: 'Аккаунт оновлено.',
            en: 'Account updated.'
        })
        document.location.reload();

    } catch (error) {
        // Console
        if(error?.message) console.log(error?.message);
        // User message
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
            noData: () => popup('error', {
                en: 'Missing data.',
                uk: 'Відсутні дані.'
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

//  ** Events **
document.addEventListener('DOMContentLoaded', async (e) => {
    try{
        const response = await fetch('http://192.168.0.108:3000/profile/info', {
            method: 'GET',
            credentials: 'include'
        })

        // Error
        if(!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }
        // Success
        const data = await response.json();

        const defaults = { name: "", email: "", age: "2000-10-01" };
        
        ["name", "email", "age"].forEach((key) => {
            const element = document?.querySelector(`[data-account="${key}"]`);
            if (element) element.value = data?.[key] || defaults[key];
        });
        

    } catch (error) {
        // Console
        if(error?.message) console.log(error?.message);
        // User message
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
})

document.body.addEventListener('click', (e) => {
    const target = e.target;
    if(target.closest('[data-dlt-account]')) {
        deleteAcoount();
    }
    if(target.closest('[data-updt-account]')) {
      updateAcoount();
    }
})
