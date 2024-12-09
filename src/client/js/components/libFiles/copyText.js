function copyText (content) {
    const textElement = content.querySelector('[data-crib-content]');
    const textContent = textElement.innerText || textElement.textContent;

    // Used textarea to copy the text in the element
    const textArea = document.createElement('textarea');
    textArea.value = textContent;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Failed to copy the text: ', err);
    }

    document.body.removeChild(textArea);
}

export default copyText;