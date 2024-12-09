export function success (messege = 'Empty') {
    document.body.insertAdjacentHTML('beforeend', ` 
        <div id="success" class="success">
        <div class="success__wrapper">
            <div class="success__icon _icon-check"></div>
            <p class="success__messege">${messege}</p>
        </div>
     </div>`)

    const removeContent = () => {
        document.querySelector('#success').remove();
    }
    document.querySelector('[data-btn="saveDocument"]').classList.add('saved');
    setTimeout(removeContent, 5000);
}