// Function to create a hyperlink
function link(content) {
    const linkText = prompt("Enter a URL");

    // Basic URL validation
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(linkText)) {
        alert("Please enter a valid URL.");
        return;
    }
    modifyText(content, 'createLink', false, linkText);
}

// Fixed bug with focus on the beginning of the text
function setCursorToEnd(el) {
    el.focus();
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(el);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
}

// Function to modify
function modifyText(content, command, defaultUi = false, value = null) {
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
        if (selection.toString()) {
            document.execCommand(command, defaultUi, value);
            return;
        }
    }

    setCursorToEnd(content);
    document.execCommand(command, defaultUi, value);
}

export { link, modifyText };
