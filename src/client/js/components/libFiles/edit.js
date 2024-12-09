import { order } from "./operations.js";
import { removePopMenu } from "./popup.js";

function edit(chapter) {
    // Clearing the active chapters ( when creating a new chapter ).
    if(!chapter) {
        editClearAll();
        return
    }
    const isActive = chapter.classList.contains('_edit-chapter');
    editClearAll();
    // Checking if chapter not active
    if (!isActive) {
        chapter.querySelectorAll('[data-edit]').forEach(editElement => {
            editElement.contentEditable = "true";
        });
        chapter.classList.add('_edit-chapter');
    } 
}

function editClearAll() {
    document.querySelectorAll('[data-chapter]').forEach(chapter => {
        if(chapter.classList.contains('_edit-chapter')) {
            // Checking for element reordering activity
            const isSortableElement = chapter.querySelector('[data-crib-items]');
            if (isSortableElement && isSortableElement.classList.contains('ui-sortable')) {
                const btnOrder = chapter.querySelector('[data-btn="order"]');
                btnOrder.querySelector('[data-order-check]').checked = false;
                order(isSortableElement, btnOrder); 
            }
            // Search active popup
            if(chapter.querySelector('[data-pop-active]')) {
                removePopMenu()
            }
            // 
            chapter.querySelectorAll('[data-edit]').forEach(editElement => {
                editElement.contentEditable = "false";
            });
            chapter.classList.remove('_edit-chapter');
            return
        }
    });
}

export default edit;