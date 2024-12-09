'use strict'
import "../scss/term.scss";

// Assets ==========================================================================================
import jsonStorage from '../json/jsonStores.json' assert { type: 'json' }; // database
export let storage = jsonStorage;

import { spollers } from  "./components/files/functions.js"; // spoiler
import { inputCheck } from "./components/termFiles/inputLoader.js"; // input
import { infoCreate, infoRemove, infoSave } from "./components/termFiles/infoAboutFood.js"; // info popup
import { saveDocument } from "./components/termFiles/downloadFiles.js"; // download
import { createNewDate, saveNewDate } from "./components/termFiles/createNewDate.js"; // new date



// category shop list
export const chainStore = [
    'Свій маркет', 'Близенько', 'Рукавичка', 'АТБ', 'Арсен', 'Сімі'
]

console.log(storage)



// Page initialization ==============================================================================
pageLoading();
spollers();
inputCheck();


// Checking action buttons click
document.addEventListener('click', pageEvents); 


// Click check
function pageEvents(e) {
    const target = e.target;
    if (target.closest('[data-btn]')) {
        const btnValue = target.closest('[data-btn]').getAttribute('data-btn'); 
        // Checking the availability of a function before calling it
        try {
            if (events[btnValue]) events[btnValue](target);
            else alert("Not found button value.");
        }catch(error) {
            console.error(error)
            // console.log(error.messaga) 
        }
       
    }
}

// Events list
const events = {
    info: infoCreate,
    infoSave: infoSave,
    infoRemove: infoRemove,
    newDate: createNewDate,
    newDateSave: saveNewDate,
    saveDocument: saveDocument,
};


export function pageLoading() {
    const loadDates = document.querySelector('[data-container]');
    const today = new Date();
    const daysThreshold = 16;
    let isNewDeadlines;

    const savedChanges = JSON.parse(localStorage.getItem('storesDates'));

    if(savedChanges) {
        storage = savedChanges
        document.querySelector('[data-btn="saveDocument"]').classList.add('saved');
    };

    // Separate styles for different groups of stores
    const addDateInContainer = (foodName, foodDaysLeft, marketType, marketaddress,  storageIndex, foodDatesIndex) => {
        const marketNames = {
            'Свій маркет': 'shop_sviumarket',
            'Близенько': 'shop_blizenko',
            'Рукавичка': 'shop_rukavichka',
            'АТБ': 'shop_atb',
            'Сімі': 'shop_simi',
            'Арсен': 'shop_arsen'
        };

        const marketName = marketNames[marketType] || '';

        if(isNewDeadlines) {
            loadDates.insertAdjacentHTML('beforeend', `
                <div data-spollers data-storage-index="${storageIndex}" class="shop ${marketName}">
                    <h2 data-spoller class="shop__title _icon-angle-right">${marketaddress}</h2>
                    <div class="shop__items">
                        <div data-food-index="${foodDatesIndex}" class="shop__item">
                            <p data-date="name" class="shop__product">${foodName} :</p> 
                            <p data-date="days" class="shop__days"><span class="shop__span">${foodDaysLeft}</span> днів</p>
                            <button data-btn="infoRemove" class="shop__btn-remove _icon-plus"></button>  
                            <button data-btn="info" class="shop__btn-info">i</button>  
                        </div>
                    </div>
                </div>`);
            isNewDeadlines = false;
        } else {
            const shopInCalculation = document.querySelector(`[data-storage-index="${storageIndex}"]`);
            console.log(storageIndex)
            console.log(shopInCalculation)
            shopInCalculation.querySelector('.shop__items').insertAdjacentHTML('beforeend', ` <div data-food-index="${foodDatesIndex}" class="shop__item">
                            <p data-date="name" class="shop__product">${foodName} :</p> 
                            <p data-date="days" class="shop__days"><span class="shop__span">${foodDaysLeft}</span> днів</p>
                            <button data-btn="infoRemove" class="shop__btn-remove _icon-plus"></button>  
                            <button data-btn="info" class="shop__btn-info">i</button>  
                        </div>`)
        }
    };

    // Date comparison
    storage.forEach((item, indexShop) => {
        isNewDeadlines = true;
        item.foodDates.forEach((dateString, indexFood) => {
            const [foodName, foodTime] = dateString.split(', ');
            const dateParts = foodTime.split('-');
            const foodDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

            const daysDifference = Math.ceil((foodDate - today) / (1000 * 60 * 60 * 24));

            if (daysDifference <= daysThreshold) {
                addDateInContainer(foodName, daysDifference, item.category, item.address, indexShop, indexFood);
            }
        });
    });
}

