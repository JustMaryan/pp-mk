import html from "./html.js";

export function removePopMenu() {
    document.querySelector('[data-pop-active]').querySelector('.popup-menu').remove()
    document.querySelector('[data-pop-active]').removeAttribute('data-pop-active')
}

export function activePopMenu (popPanel, button) {
    if(document.querySelector('[data-pop-active]')) {
        removePopMenu();
        return
    }
    button.setAttribute('data-pop-active', '')
    if (popPanel === 'textEdit') button.insertAdjacentHTML('beforeend', html.popTextEdit)
        else if (popPanel === 'colorEdit') button.insertAdjacentHTML('beforeend', html.popColorEdit)
        else if (popPanel === 'colorEditBg') button.insertAdjacentHTML('beforeend', html.popColorEditBg)
        else if (popPanel === 'fontEdit') button.insertAdjacentHTML('beforeend', html.popFontEdit)
}
