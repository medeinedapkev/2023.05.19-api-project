import { MAIN_MENU_ITEMS } from "./config.js";
import { createHTMLElement } from './funtions.js';

export default function navigation() {
    const headerElement = createHTMLElement('header', 'navigation-wrapper');

    const pageTitle = createHTMLElement('a', 'page-title', 'API PROJECT');
    pageTitle.href = './';

    const navigationDiv = createHTMLElement('nav', 'navigation');
    
    const menu = MAIN_MENU_ITEMS;
    
    const navigationList = createMenu(menu);
    
    const searchForm = document.createElement('form');
    searchForm.id = 'search-form';
    searchForm.action = './search.html';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'search';
    searchInput.name = 'search';

    const searchButton = createHTMLElement('button', 'search-form-submit', 'Search');
    searchButton.setAttribute('type', 'submit');
    
    searchForm.append(searchInput, searchButton);

    navigationDiv.append(navigationList, searchForm);

    headerElement.append(pageTitle, navigationDiv);
    console.log(location.href)

    searchForm.addEventListener('submit', (event) => {
        
        console.dir(event.target)
        console.log(searchInput.value)

    })

    return headerElement;
}



function createMenu(menu) {
    const ulElement = createHTMLElement('ul', 'menu-list');

    menu.forEach(link => {
        const liElement = createHTMLElement('li', 'menu-item');

        const linkElement = createHTMLElement('a', 'menu-link', link.name)
        linkElement.href = link.url;

        liElement.prepend(linkElement);
        ulElement.append(liElement);

        const currentPage = location.href;

        if(currentPage === linkElement.href) {
            liElement.classList.add('active');
        }
    })

    return ulElement;
}

