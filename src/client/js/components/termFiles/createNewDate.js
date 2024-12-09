import { popup } from "./popup.js";
import { storage } from "../../term.js";
import { chainStore } from "../../term.js";
import { success } from "./succes.js";
import { localSaveDate } from "./localSaceDate.js";

export function createNewDate(target) {
    let selectHtml = '';

    chainStore.forEach(group => {
        let selectOptions = '';

        storage.forEach((store, index) => {
            if (store.category === group) {
                selectOptions += `<option value='${index}'>${store.address}</option>`;
            }
        });

        selectHtml += `<optgroup label="${group}">${selectOptions}</optgroup>`;
    });


    const newDatePanel = `
        <h4 class="popup__title">Створити нову дату</h4>
        <p class="popup__text">Введіть адресу магазина:</p>
        <select data-select="address" class="popup__select">
            ${selectHtml}
        </select>
        <p class="popup__text">Введіть назву продукта:</p>
        <div class="popup__input">
            <input data-input="food-name" id="input-product" type="text" autocomplete="off" class="popup__field">
            <label for="input-product" class="popup__label">Product</label>
        </div>
        <p class="popup__text">Введіть дату продукта:</p>
        <input data-input="food-date" type="date" class="popup__date">
        <div class="popup__btns">
            <button data-btn="newDateSave" class="popup__btn-confirm">Confirm</button>
            <button class="popup__btn-reset">Reset</button>
        </div>
    `;

    popup(newDatePanel);
}


export function saveNewDate (target) {
    const newDateContainer = target.closest('.popup');
    const shopIndex = newDateContainer.querySelector('[data-select="address"]').value;
    const foodName = newDateContainer.querySelector('[data-input="food-name"]').value;
    const foodDate = newDateContainer.querySelector('[data-input="food-date"]').value;

    if (!foodName) {
        alert('Введіть назву');
        return;
    }

    if (!foodDate) {
        alert('Введіть дату');
        return;
    }

    const newFoodDate = `${foodName.trim()}, ${foodDate}`;

    storage[Number(shopIndex)].foodDates.push(newFoodDate);

    success(`Створено: <span>${newFoodDate}</span>. За адресою: <span>${storage[Number(shopIndex)].category}, ${storage[Number(shopIndex)].address}</span> `);
    localSaveDate();
}

