import navigation from './navigation.js';
import { API_URL } from './config.js';
import { fetchData, firstLetterUpperCase, getUrlParams, createHTMLElement } from './funtions.js';

async function init() {
    const id = getUrlParams('user_id');

    const userInfoWrapper = document.querySelector('.user-info-wrapper');

    if (!id) {
        userInfoWrapper.innerHTML = `<h1>Something is wrong...</h1>
                                  <p>Search for more users 
                                  <a href="./users.html">here...</a>
                                  </p>`;
  
        return;
    }

    const userInfoData = await fetchData(`${API_URL}/users/${id}?_embed=albums&_embed=posts`);

    const userInfo = createUserInfo(userInfoData);
    const userPosts = createUserPosts(userInfoData);
    const userAlbums = createUserAlbums(userInfoData);
    userInfoWrapper.prepend(userInfo, userPosts, userAlbums);

    const mainHeader = navigation();
    userInfoWrapper.before(mainHeader);
}

init();

function createUserInfo(data) {
    const userInfoDiv = createHTMLElement('div', 'user-info-wrapper');


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
    const lat = data.address.geo.lat;
    const lng = data.address.geo.lng;

    const h1Element = createHTMLElement('h2', 'user-name', `${name} information:`);

    const userNameElement = createHTMLElement('p', 'user-info-item', `Username: ${userName}`);


    const emailElement = createHTMLElement('p', 'user-info-item', 'Email: ');

    const linkToEmail = document.createElement('a');
    linkToEmail.href = `mailto:${email}`;
    linkToEmail.textContent = email;

    emailElement.append(linkToEmail);

    const addressElement = createHTMLElement('p', 'user-info-item', 'Address: ');
 

    const linkToAddress = document.createElement('a');
    linkToAddress.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    linkToAddress.setAttribute('target', '_blank');
    linkToAddress.textContent = `${street}, ${apartment}, ${city}, (zipcode: ${zipCode}).`;

    addressElement.append(linkToAddress);

    const phoneElement = createHTMLElement('p', 'user-info-item', 'Phone: ');

    const linkToPhone = document.createElement('a');
    linkToPhone.href = `tel:${phone}`
    linkToPhone.textContent = phone;

    phoneElement.append(linkToPhone);

    const websiteElement = createHTMLElement('p', 'user-info-item', 'Website: ')

    const linkToWebsite = document.createElement('a');
    linkToWebsite.href = `https://${website}`;
    linkToWebsite.textContent = website;

    websiteElement.append(linkToWebsite);

    const companyElement = createHTMLElement('p', 'user-info-item', `Work place: ${companyName}.`);


    userInfoDiv.append(h1Element, userNameElement, emailElement, addressElement, phoneElement, websiteElement, companyElement);

    return userInfoDiv;
}

function createUserPosts(data) {
    const postsWrapper = createHTMLElement('div', 'posts-wrapper');
    
    const titleElement = createHTMLElement('h2', 'posts-title', `${data.name} posts:`);

    if(!data.posts) {
        const infoElement = document.createElement('p');
        infoElement.textContent = `No posts found`;
        postsWrapper.prepend(titleElement, infoElement);
        return postsWrapper;
    }

    data.posts.forEach(post => {
        const postTitle = post.title;
        const postText = post.body;

        const postItem = createHTMLElement('div', 'post-item');

        const linkToPost = document.createElement('a');
        linkToPost.href = './post.html'

        const postTitleElement = createHTMLElement('h3', 'post-title', firstLetterUpperCase(postTitle));

        linkToPost.append(postTitleElement);

        const postTextElement = createHTMLElement('p', 'post-text', firstLetterUpperCase(postText));

        postItem.prepend(linkToPost, postTextElement);
        postsWrapper.prepend(titleElement, postItem); 
    })

    return postsWrapper;
}

function createUserAlbums(data) {
    const albumsWrapper = createHTMLElement('div', 'albums-wrapper');

    const titleElement = createHTMLElement('h2', 'albums-title', `${data.name} albums:`);

    if(!data.albums) {
        const infoElement = document.createElement('p');
        infoElement.textContent = `No albums found`;
        albumsWrapper.prepend(titleElement, infoElement);
        return albumsWrapper;
    }

    data.albums.forEach(album => {
        const albumTitle = album.title;

        const albumItem = createHTMLElement('div', 'album-item');

        const linkToAlbum = document.createElement('a')
        linkToAlbum.href = './album.html';

        const albumTitleElement = createHTMLElement('h3', 'album-title', firstLetterUpperCase(albumTitle));

        linkToAlbum.prepend(albumTitleElement);
        albumItem.prepend(linkToAlbum)
        albumsWrapper.prepend(titleElement, albumItem);
    })

    return albumsWrapper;
}

