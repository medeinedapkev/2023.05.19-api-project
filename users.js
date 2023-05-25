import { createHTMLElement, fetchData } from "./funtions.js";

async function init() {

    const usersData = await fetchData('https://jsonplaceholder.typicode.com/users?_embed=posts');

    const usersWrapper = document.querySelector('#users-wrapper');

    const usersList = usersNameList(usersData);
    usersWrapper.append(usersList);
}

init()

function usersNameList(users) {
    const usersUlElement = createHTMLElement('ul', 'users-list');

    users.forEach(userData => {
        const userId = userData.id;
        const user = userData.name;
        const userPostNumber = userData.posts.length;

        const userLiElement = createHTMLElement('li', 'user-item');
        
        const linkToUsersInfo = createHTMLElement('a', 'link', `${user} (${userPostNumber})`)
        linkToUsersInfo.classList.add('user');
        linkToUsersInfo.href = './user.html?user_id=' + userId;

        userLiElement.append(linkToUsersInfo);
        usersUlElement.append(userLiElement);
    })

    return usersUlElement;
}



