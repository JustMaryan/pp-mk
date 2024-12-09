import edit from "./edit.js";

export function save() {
    const cribBody = document.querySelector('[data-body]');
    edit();

    // 
    const newJSON = {
        menu: [],
        chapter: []
    }
    test(cribBody, newJSON)

    // 
    downloadJSON(newJSON, 'cribLibrary.json');

}


function test(body, newjSON) {
    let idCounter = 0;
    body.querySelectorAll('[data-chapter]').forEach(chapter => {
        newjSON.chapter.push({
            chapterTitle: `${chapter.querySelector('[data-crib-content="main-title"]').innerText}`,
            contentSections: []
        })
        generateMenu(newjSON.chapter[newjSON.chapter.length - 1].chapterTitle, newjSON);
        chapter.querySelectorAll('[data-crib-item]').forEach(item => {
            if(item.dataset.cribItem === "text") {
                newjSON.chapter[newjSON.chapter.length - 1].contentSections.push({
                    sectionType: "Text",
                    sectionText: `${item.querySelector('[data-crib-content]').innerHTML}`,
                    sectionId: null,
                    sectionDescription: null
                });
            }
            else if (item.dataset.cribItem === "title") {
                newjSON.chapter[newjSON.chapter.length - 1].contentSections.push({
                    sectionType: "Title",
                    sectionText: `${item.querySelector('[data-crib-content]').innerText}`,
                    sectionId: idCounter,
                    sectionDescription: null
                });
                generateMenu(newjSON.chapter[newjSON.chapter.length - 1].chapterTitle, newjSON, item.querySelector('[data-crib-content]').innerText, idCounter, "Title");
                idCounter++;
            }
            else if (item.dataset.cribItem === "subtitle") {
                newjSON.chapter[newjSON.chapter.length - 1].contentSections.push({
                    sectionType: "Subtitle",
                    sectionText: `${item.querySelector('[data-crib-content]').innerText}`,
                    sectionId: idCounter,
                    sectionDescription: null
                });
                generateMenu(newjSON.chapter[newjSON.chapter.length - 1].chapterTitle, newjSON, item.querySelector('[data-crib-content]').innerText, idCounter, "Subtitle");
                idCounter++;
            }
            else if (item.dataset.cribItem === "important") {
                newjSON.chapter[newjSON.chapter.length - 1].contentSections.push({
                    sectionType: "Important",
                    sectionText: `${item.querySelector('[data-crib-content]').innerHTML}`,
                    sectionId: null,
                    sectionDescription: null
                });
            }
            else if (item.dataset.cribItem === "warning") {
                newjSON.chapter[newjSON.chapter.length - 1].contentSections.push({
                    sectionType: "Warning",
                    sectionText: `${item.querySelector('[data-crib-content]').innerHTML}`,
                    sectionId: null,
                    sectionDescription: null
                });
            }
            else if (item.dataset.cribItem === "code") {
                newjSON.chapter[newjSON.chapter.length - 1].contentSections.push({
                    sectionType: "Code",
                    sectionText: `${item.querySelector('[data-crib-content]').innerHTML}`,
                    sectionId: null,
                    sectionDescription: `${item.querySelector('.code__description').innerHTML}`
                });
            }
            else {
                console.log("Unexpected error")
            }
        })
    })
}
function generateMenu(menuTitle, newjSON, itemTitle = null, id = null, itemType) {
    const existingMenu = newjSON.menu.find(item => item.menuName === menuTitle);
    
    if (existingMenu) {
        existingMenu.menuItems.push({
            itemName: itemTitle,
            itemType: itemType,
            itemId: id
        });
    } else {
        if(itemTitle || id) {
            newjSON.menu.push({
                menuName: menuTitle,
                menuItems: []
            });
        } else {
            newjSON.menu.push({
                menuName: menuTitle,
                menuItems: []
            });
        }
    }
}


function downloadJSON(data, filename) {
    const jsonCrib = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonCrib], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

export default save;