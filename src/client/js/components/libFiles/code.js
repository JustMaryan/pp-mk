import html from './html.js';

function code(chapterItems) {
    const newItem = document.createRange().createContextualFragment(html.code);
    const contentContainer = newItem.querySelector('[data-crib-content]');
    chapterItems.appendChild(newItem);

    CodeMirror(contentContainer, {
        mode: "javascript",
        theme: "dracula",
        lineNumbers: false,
        autoCloseBrackets: true
    });

}

export default code;
