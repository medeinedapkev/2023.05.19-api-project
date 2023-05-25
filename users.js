import { API_URL } from "./config.js";
import { createHTMLElement, fetchData } from "./funtions.js";
import navigation from "./navigation.js";

async function init() {

    const usersData = await fetchData(`${API_URL}/users?_embed=posts`);

    const usersWrapper = document.querySelector('#users-wrapper');

    const usersList = usersNameList(usersData);
    usersWrapper.append(usersList);

    const mainHeader = navigation();
    usersWrapper.before(mainHeader);
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



