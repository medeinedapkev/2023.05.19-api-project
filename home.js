import navigation from "./navigation.js";

function init() {
    const contentElement = document.querySelector('.content');

    const mainHeader = navigation();
    contentElement.before(mainHeader);
}

init();