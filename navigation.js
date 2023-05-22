function init() {
    const bodyElement = document.querySelector('body');
    const headerElement = document.createElement('header');
    headerElement.classList.add('navigation-wrapper')
    bodyElement.prepend(headerElement);

    const navigationDiv = document.createElement('nav');
    navigationDiv.classList.add('navigation');
    headerElement.append(navigationDiv);

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

