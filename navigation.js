function init() {
    const headerElement = document.createElement('header');
    headerElement.classList.add('navigation-wrapper')

    document.body.prepend(headerElement);

    const navigationDiv = document.createElement('nav');
    navigationDiv.classList.add('navigation');
    
    const menu = [
        {
            name: 'Home',
            url: './home.html',
        },
        {
            name: 'Users',
            url: './users.html',
        },
        {
            name: 'Posts',
            url: './posts.html',
        },
        {
            name: 'Albums',
            url: './albums.html',
        }
    ]
    
    const navigationList = createMenu(menu);
    navigationDiv.append(navigationList);

    const searhForm = document.createElement('form');
    searhForm.id = 'search-form';
    searhForm.action = './search.html';

    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', 'search');
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'search';
    inputElement.name = 'search';

    const submitButton = document.createElement('input');
    submitButton.id = 'search-form-submit';
    submitButton.setAttribute('type', 'submit');

    searhForm.append(labelElement, inputElement, submitButton);

    headerElement.append(navigationDiv, searhForm);

    searhForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // console.dir(event.target)
        // console.log(inputElement.value)
    })

}

init();

function createMenu(menu) {
    const ulElement = document.createElement('ul');
    ulElement.classList.add('menu-list');

    menu.forEach(link => {
        const liElement = document.createElement('li');
        liElement.classList.add('menu-item');

        const linkElement = document.createElement('a');
        linkElement.classList.add('menu-link');
        linkElement.textContent = link.name;
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

function createSearchInput() {
    const searhForm = document.createElement('form');
    searhForm.id = 'search-form';

    const labelElement = document.createElement('label');
    labelElement.setAttribute('for', 'search');
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'search';
    inputElement.name = 'search';

    searhForm.append(labelElement, inputElement);

    return searhForm;
}