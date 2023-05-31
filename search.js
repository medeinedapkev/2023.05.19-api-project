import navigation from "./navigation.js";
import { getUrlParams } from "./funtions.js";
import searchResults from './search-results.js';

async function init() {
    const searchPageForm = document.querySelector('#local-search-form');
    const mainHeader = navigation();
    searchPageForm.before(mainHeader);

    const contentElement = document.querySelector('.content');

    const searchFor = getUrlParams('search');

    searchResults(searchFor, contentElement);

    searchPageForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const form = event.target;
        const searchInputValue = form['search-input'].value;

        searchResults(searchInputValue, contentElement);

        form.reset();
    })
}

init();
