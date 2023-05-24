async function init() {
    const queryParams = location.search;
    const urlParams = new URLSearchParams(queryParams);

    const id = urlParams.get('user_id');

    const userInfoResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}?_embed=albums&_embed=posts`);
    const userInfoData = await userInfoResponse.json();

    const userInfoWrapper = document.querySelector('.user-info-wrapper');

    const userInfo = createUserInfo(userInfoData);
    const userPosts = createUserPosts(userInfoData);
    const userAlbums = createUserAlbums(userInfoData);
    userInfoWrapper.prepend(userInfo, userPosts, userAlbums);
}

init();

function createUserInfo(data) {
    const userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add('user-info-wrapper');

    const name = data.name;
    const userName = data.username;
    const email = data.email;
    const street = data.address.street;
    const apartment = data.address.suite;
    const city = data.address.city;
    const zipCode = data.address.zipcode;
    const phone = data.phone;
    const website = data.website;
    const companyName = data.company.name;

    const h1Element = document.createElement('h2');
    h1Element.classList.add('user-name');
    h1Element.textContent = `${name} information:`;

    const userNameElement = document.createElement('p');
    userNameElement.classList.add('user-info-item');
    userNameElement.textContent = `Username: ${userName}`;

    const emailElement = document.createElement('p');
    emailElement.classList.add('user-info-item');
    emailElement.textContent = `Email: `;
    const linkToEmail = document.createElement('a');
    linkToEmail.href = `mailto:${email}`;
    linkToEmail.textContent = email;

    emailElement.append(linkToEmail);

    const addressElement = document.createElement('p');
    addressElement.classList.add('user-info-item');
    addressElement.textContent = 'Address: ';

    const linkToAddress = document.createElement('a');
    linkToAddress.href = `https://www.google.com/maps/search/?api=1&query=${data.address.geo.lat},${data.address.geo.lng}`;
    linkToAddress.textContent = `${street}, ${apartment}, ${city}, (zipcode: ${zipCode}).`;

    addressElement.append(linkToAddress);

    const phoneElement = document.createElement('p');
    phoneElement.classList.add('user-info-item');
    phoneElement.textContent = 'Phone: ';
    const linkToPhone = document.createElement('a');
    linkToPhone.href = `tel:${phone}`
    linkToPhone.textContent = phone;

    phoneElement.append(linkToPhone);

    const websiteElement = document.createElement('p');
    websiteElement.classList.add('user-info-item');
    websiteElement.textContent = 'Website: ';
    const linkToWebsite = document.createElement('a');
    linkToWebsite.href = `https://${website}`;
    linkToWebsite.textContent = website;

    websiteElement.append(linkToWebsite);

    const companyElement = document.createElement('p');
    companyElement.classList.add('user-info-item');
    companyElement.textContent = `Work place: ${companyName}.`;

    userInfoDiv.append(h1Element, userNameElement, emailElement, addressElement, phoneElement, websiteElement, companyElement);

    return userInfoDiv;
}

function createUserPosts(data) {
    const postsWrapper = document.createElement('div');
    postsWrapper.classList.add('posts-wrapper');
    
    const titleElement = document.createElement('h2');
    titleElement.textContent = `${data.name} posts:`;

    // const posts = data.posts;

    // notFound(posts, postsWrapper, 'posts', titleElement);

    if(!data.posts) {
        const infoElement = document.createElement('p');
        infoElement.textContent = `No posts found`;
        postsWrapper.prepend(titleElement, infoElement);
        return postsWrapper;
    }

    data.posts.forEach(post => {
        const postTitle = post.title;
        const postText = post.body;

        const postItem = document.createElement('div');
        postItem.classList.add('post-item');

        const linkToPost = document.createElement('a');
        linkToPost.href = './post.html'

        const postTitleElement = document.createElement('h3');
        postTitleElement.classList.add('post-title');
        postTitleElement.textContent = postTitle;

        linkToPost.append(postTitleElement);

        const postTextElement = document.createElement('p');
        postTextElement.classList.add('post-text');
        postTextElement.textContent = postText;

        postItem.prepend(linkToPost, postTextElement);
        postsWrapper.prepend(titleElement, postItem); 
    })

    return postsWrapper;
}

function createUserAlbums(data) {
    const albumsWrapper = document.createElement('div');
    albumsWrapper.classList.add('albums-wrapper');

    const titleElement = document.createElement('h2');
    titleElement.textContent = `${data.name} albums:`;

    if(!data.albums) {
        const infoElement = document.createElement('p');
        infoElement.textContent = `No albums found`;
        albumsWrapper.prepend(titleElement, infoElement);
        return albumsWrapper;
    }

    data.albums.forEach(album => {
        const albumTitle = album.title;

        const albumItem = document.createElement('div');
        albumItem.classList.add('album-item');

        const linkToAlbum = document.createElement('a')
        linkToAlbum.href = './album.html';

        const albumTitleElement = document.createElement('h3');
        albumTitleElement.classList.add('album-title');
        albumTitleElement.textContent = albumTitle;

        linkToAlbum.prepend(albumTitleElement);
        albumItem.prepend(linkToAlbum)
        albumsWrapper.prepend(titleElement, albumItem);
    })

    return albumsWrapper;
}

function notFound(element, elementWrapper, text, titleElement) {
    if(!element) {
        const infoElement = document.createElement('p');
        infoElement.textContent = `No ${text} found`;
        elementWrapper.prepend(titleElement, infoElement);
    }

    return elementWrapper;
}