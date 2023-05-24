async function init() {
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users?_embed=posts');
    const usersData = await usersResponse.json();

    const usersWrapper = document.querySelector('#users-wrapper');

    const usersList = usersNameList(usersData);
    usersWrapper.append(usersList);
}

init()

function usersNameList(users) {
    const usersUlElement = document.createElement('ul');
    usersUlElement.classList.add('users-list');

    users.forEach(userData => {
        const userId = userData.id;
        const user = userData.name;
        const userPostNumber = userData.posts.length;

        const userLiElement = document.createElement('li');
        userLiElement.classList.add('user-item');
        
        const linkToUsersInfo = document.createElement('a');
        linkToUsersInfo.classList.add('link', 'user')
        linkToUsersInfo.textContent = `${user} (${userPostNumber})`;
        linkToUsersInfo.href = './user.html?user_id=' + userId;

        userLiElement.append(linkToUsersInfo);
        usersUlElement.append(userLiElement);
    })

    return usersUlElement;
}



