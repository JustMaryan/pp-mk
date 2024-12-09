import "../scss/lib.scss";
import library from "./components/libFiles/jsonFile.js";
import { spollers } from "./components/files/functions.js";
import { addElement, order, clear, remove, localSave } from './components/libFiles/operations.js';
import save from "./components/libFiles/save.js";
import { link, modifyText } from './components/libFiles/modifyContent.js';
import code from "./components/libFiles/code.js"; 
import edit from "./components/libFiles/edit.js"; 
import copyText from "./components/libFiles/copyText.js";
import { activePopMenu, removePopMenu } from "./components/libFiles/popup.js";


// Check connection to library
if (!library) {
    alert("Library data not specified!");
} else {
    loadPage();
}



document.querySelector('.page').addEventListener('click', cribAction);


// Loading page content
function loadPage() {
    const bodyCrib = document.querySelector('[data-body]');
    const menuCrib = document.querySelector('[data-menu]');

    library.menu.forEach(links => {
        let menuItems = '';
        links.menuItems.forEach(item => {
            if(item.itemType === "Title") {
                menuItems += `
                <li class="menu__item">
					<a href="#${item.itemId}" class="menu__link">${item.itemName}</a>
				</li>`
            } 
            if (item.itemType === "Subtitle"){
                menuItems += `
                <li class="menu__item menu__item_subtitle">
					<a href="#${item.itemId}" class="menu__link">${item.itemName}</a>
				</li>`
            }
        })
        menuCrib.insertAdjacentHTML('beforeend', `
            <div data-menu data-spollers class="menu__spoiler">
				<h2 data-spoller data-menu="title" class="menu__title _icon-angle-right">${links.menuName}</h2>
				<ul data-menu="items" class="menu__items">
                ${menuItems}
				</ul>
			</div>`)
    });

    library.chapter.forEach(chapter => {
        let chapterContent = '';
        chapter.contentSections.forEach(content => {
            if(content.sectionType === 'Title') {
                chapterContent += `
                    <div id="${content.sectionId}" data-crib-item="title" class="items-chapter__element items-chapter__element_title">
		                <div class="items-chapter__menu">
			                <button data-btn="remove" type="button" class="items-chapter__btn items-chapter__btn_remove _icon-cross"></button>
		                </div>
		                <div contenteditable="false" data-edit data-crib-content="title" class="items-chapter__content">${content.sectionText}</div>
	                </div>`
            }
            if(content.sectionType === 'Subtitle') {
                 chapterContent += `
                    <div id="${content.sectionId}" data-crib-item="subtitle" class="items-chapter__element items-chapter__element_subtitle">
	                	<div class="items-chapter__menu">
	                		<button data-btn="remove" type="button" class="items-chapter__btn items-chapter__btn_remove _icon-cross"></button>
	                	</div>
	                	<div contenteditable="false" data-edit data-crib-content class="items-chapter__content">${content.sectionText}</div>
	                </div>`
            }
            if(content.sectionType === 'Text') {
                 chapterContent += `
                    <div data-crib-item="text" class="items-chapter__element">
	                	<div class="items-chapter__menu">
	                		<button data-btn="popFontSetting" class="items-chapter__btn _icon-sort-size-up">Шрифт</button>
	                		<button data-btn="popColor" class="items-chapter__btn _icon-palette">Колір</button>
	                		<button data-btn="popColorBg" class="items-chapter__btn _icon-fill">Фон</button>
	                		<button data-btn="popTextSetting" class="items-chapter__btn _icon-settings-sliders">Стилі</button>
	                		<button data-btn="remove" type="button" class="items-chapter__btn items-chapter__btn_remove _icon-cross"></button>
	                	</div>
	                	<div contenteditable="false" data-edit data-crib-content class="items-chapter__content">${content.sectionText}</div>
	                </div>`
            };
            if(content.sectionType === 'Important') {
                 chapterContent += `
                    <div data-crib-item="important" class="items-chapter__element items-chapter__element_important">
	                	<div class="items-chapter__menu">
	                		<button data-btn="popFontSetting" class="items-chapter__btn _icon-sort-size-up">Шрифт</button>
	                		<button data-btn="popColor" class="items-chapter__btn _icon-palette">Колір</button>
	                		<button data-btn="popColorBg" class="items-chapter__btn _icon-fill">Фон</button>
	                		<button data-btn="popTextSetting" class="items-chapter__btn _icon-settings-sliders">Стилі</button>
	                		<button data-btn="remove" type="button" class="items-chapter__btn items-chapter__btn_remove _icon-cross"></button>
	                	</div>
	                	<div contenteditable="false" data-edit data-crib-content class="items-chapter__content">${content.sectionText}</div>
	                </div>`
            };
            if(content.sectionType === 'Warning') {
                 chapterContent += `
                    <div data-crib-item="warning" class="items-chapter__element items-chapter__element_warning">
	                	<div class="items-chapter__menu">
	                		<button data-btn="popFontSetting" class="items-chapter__btn _icon-sort-size-up">Шрифт</button>
	                		<button data-btn="popColor" class="items-chapter__btn _icon-palette">Колір</button>
	                		<button data-btn="popColorBg" class="items-chapter__btn _icon-fill">Фон</button>
	                		<button data-btn="popTextSetting" class="items-chapter__btn _icon-settings-sliders">Стилі</button>
	                		<button data-btn="remove" type="button" class="items-chapter__btn items-chapter__btn_remove _icon-cross"></button>
	                	</div>
	                	<div contenteditable="false" data-edit data-crib-content class="items-chapter__content">${content.sectionText}</div>
	                </div>`
            };
            if(content.sectionType === 'Code') {
                 chapterContent += `
                    <div data-crib-item="code" class="code">
			        	<div class="code__header">
			        		<h5 class="code__title">Code</h5>
			        		<div class="code__btns">
			        			<button data-btn="copyText" type="button" class="code__btn code__btn_copy _icon-copy-alt">Копіювати код</button>
			        			<button data-btn="remove" type="button" class="code__btn code__btn_remove _icon-cross"></button>
			        		</div>
			        	</div>
			        	<div class="code__body">
			        		<div data-edit data-crib-content class="code__redactor">${content.sectionText}</div>
			        	</div>
			        	<div class="code__footer">
			        		<p data-edit contenteditable="false" class="code__description">${content.sectionDescription}</p>
			        	</div>
			        </div>`
            };
        })
        bodyCrib.insertAdjacentHTML('beforeend', `
            <div data-chapter class="chapter">
				<h2 contenteditable="false" data-edit data-crib-content="main-title" class="chapter__title">${chapter.chapterTitle}</h2>
				<div class="chapter__edit">
					<button data-btn="remove" type="button" class="chapter__btn chapter__btn_remove _icon-cross">Видалити</button>
					<button data-btn="edit" type="button" class="chapter__btn chapter__btn_edit _icon-file-edit">Редагувати</button>
				</div>
				<div data-crib-items class="chapter__content items-chapter">
                ${chapterContent}
                </div>	
				<div class="chapter__menu">
					<div class="chapter__left">
						<button data-btn="add-title" type="button" class="chapter__btn _icon-plus">Заголовок</button>
						<button data-btn="add-subtitle" type="button" class="chapter__btn _icon-plus">Підзаголовок</button>
						<button data-btn="add-text" type="button" class="chapter__btn _icon-plus">Текст</button>
						<button data-btn="add-important" type="button" class="chapter__btn _icon-plus">Важливо</button>
						<button data-btn="add-warning" type="button" class="chapter__btn _icon-plus">Попередження</button>
						<button data-btn="add-code" type="button" class="chapter__btn _icon-plus">Код</button>
						<label data-btn="order" class="chapter__btn chapter__order">
							<input data-order-check type="checkbox" class="chapter__order_check">
							<span class="chapter__order_indicator _icon-rotate-reverse"></span>
						</label>
					</div>
					<div class="chapter__right">
						<button data-btn="save" type="button" class="chapter__btn chapter__btn_save _icon-check">Зберегти</button>
						<button data-btn="clear" type="button" class="chapter__btn chapter__btn_clear _icon-plus">Очистити</button>
					</div>
				</div>
			</div>`)
    });

    // Initialize spollers
    spollers();  

    // Load saved content from localStorage
    const content = localStorage.getItem('cribContent');
    if (content) {
        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = content;
        const contentTitle = contentDiv.querySelector('[data-crib-content="main-title"]').innerText;
        const titles = Array.from(bodyCrib.querySelectorAll('[data-crib-content="main-title"]'));

        const matchFound = titles.some(title => {
            if (title.innerText === contentTitle) {
                title.closest('[data-chapter]').outerHTML = content; // Replace existing chapter content
                return true;
            }
            return false;
        });

        if (!matchFound) {
            bodyCrib.insertAdjacentHTML('beforeend', `${content}`)
        }
    }
}

// Handle button interactions
function cribAction(e) {
    const button = e.target.closest('[data-btn]');
    if (button) {
        cribButtons(button, button.dataset.btn);
    }
    
    const menuButton = e.target.closest('.menu__btn-burger');
    if (menuButton) {
        document.querySelector('.page__menu').classList.toggle('_active-menu');
    }
}

// Handle button actions
function cribButtons(button, buttonValue) {
    const cribBody = document.querySelector('[data-body]');
    const cribContainer = button.closest('[data-chapter]');
    const cribItems = cribContainer?.querySelector('[data-crib-items]');
    const cribItem = button.closest('[data-crib-item]');
    const cribContent = cribItem?.querySelector("[data-crib-content]");

    const saveChanges = () => cribContainer && localSave(cribContainer);

    const operations = {
        'add-title': () => addElement(cribItems, 'title'),
        'add-text': () => addElement(cribItems, 'text'),
        'add-important': () => addElement(cribItems, 'important'),
        'add-warning': () => addElement(cribItems, 'warning'),
        'add-subtitle': () => addElement(cribItems, 'subtitle'),
        'add-code': () => code(cribItems),
        'order': () => order(cribItems, button),
        'clear': () => clear(cribItems),
        'save': () => {
            localStorage.removeItem('cribContent');
            save();
        },
        'edit': () => edit(cribContainer),
        'remove': () => remove(cribContainer, cribItem),
        'addChapter': () => {
            edit();
            addElement(cribBody, 'chapter');
            localSave(cribBody.lastElementChild);
        },
        'copyText': () => copyText(cribItem),
        'popTextSetting': () => activePopMenu('textEdit', button),
        'popColor': () => activePopMenu('colorEdit', button),
        'popColorBg': () => activePopMenu('colorEditBg', button),
        'popFontSetting': () => activePopMenu('fontEdit', button)
    };

    const modifyContent = {
        'bold': 'bold',
        'italic': 'italic',
        'justifyLeft': 'justifyLeft',
        'justifyCenter': 'justifyCenter',
        'justifyRight': 'justifyRight',
        'justifyFull': 'justifyFull',
        'createLink': () => { link(cribContent); removePopMenu(); },
        'indent': 'indent',
        'unlink': 'unlink',
        'outdent': 'outdent',
        'underline': 'underline',
        'insertOrderedList': 'insertOrderedList',
        'white': () => { modifyText(cribContent, 'foreColor', false, '#fff');  removePopMenu();},
        'black': () => { modifyText(cribContent, 'foreColor', false, '#000');  removePopMenu();},
        'gray':  () => { modifyText(cribContent, 'foreColor', false, '#465e6933');  removePopMenu();},
        'blue': () => { modifyText(cribContent, 'foreColor', false, '#1a6bac');  removePopMenu();},
        'dark': () => { modifyText(cribContent, 'foreColor', false, '#2b3a42');  removePopMenu();},
        'yellow': () => { modifyText(cribContent, 'foreColor', false, '#fdf5d8');  removePopMenu();},
        'whiteBg': () => { modifyText(cribContent, 'backColor', false, 'transparent');  removePopMenu();},
        'blackBg': () => { modifyText(cribContent, 'backColor', false, '#000');  removePopMenu();},
        'grayBg':  () => { modifyText(cribContent, 'backColor', false, '#465e6933');  removePopMenu();},
        'blueBg': () => { modifyText(cribContent, 'backColor', false, '#1a6bac');  removePopMenu();},
        'darkBg': () => { modifyText(cribContent, 'backColor', false, '#2b3a42');  removePopMenu();},
        'yellowBg': () => { modifyText(cribContent, 'backColor', false, '#fdf5d8');  removePopMenu();},
        'font-12': () => { modifyText(cribContent, 'fontSize', false, '1');  removePopMenu();},
        'font-14': () => { modifyText(cribContent, 'fontSize', false, '2');  removePopMenu();},
        'font-16': () => { modifyText(cribContent, 'fontSize', false, '3');  removePopMenu();},
        'font-18': () => { modifyText(cribContent, 'fontSize', false, '4');  removePopMenu();},
        'font-20': () => { modifyText(cribContent, 'fontSize', false, '5');  removePopMenu();},
        'font-22': () => { modifyText(cribContent, 'fontSize', false, '6');  removePopMenu();},
    };

    // Handle action execution
    const handleAction = action => {
        if (typeof action === 'function') {
            action();
        } else {
            modifyText(cribContent, action);
            removePopMenu();
        }
        saveChanges();
    };

    // Execute the appropriate operation
    if (operations[buttonValue]) {
        handleAction(operations[buttonValue]);
    } else if (cribItem && modifyContent[buttonValue]) {
        handleAction(modifyContent[buttonValue]);
    } else {
        console.error(`Unknown button value: ${buttonValue}`);
    }
}
