export function firstLetterUpperCase(string) {
    let firstLetter = string.at(0).toUpperCase();
    let restOfString = string.slice(1);
    let output = firstLetter + restOfString;

    return output;
}

export async function fetchData(url) {
    let res = await fetch(url);
    let data = await res.json();

    return data;
}

export function createHTMLElement(type, className, text) {
    const element = document.createElement(type);
    if (className) {
       element.classList.add(className);
    } 

    if (text) {
        element.textContent = text;
    }

    return element;
}

export function getUrlParams(param) {
    const queryParams = location.search;
    const urlParams = new URLSearchParams(queryParams);
    const value = urlParams.get(param);
    
    return value;  
}

export function createUserInfo(dataArr) {
    const userInfoDiv = createHTMLElement('div', 'user-info-wrapper');

    dataArr.forEach(data => {
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
    })

    return userInfoDiv;
}


export function createPostsInfo(data) {
    const postsWrapper = createHTMLElement('div', 'posts-wrapper');

    const titleElement = createHTMLElement('h2', 'posts-title', 'Posts:');

    const postsList = createHTMLElement('div', 'posts-list');

    data.forEach(post => {
        let { title, body, id } = post;

        const postItem = createHTMLElement('div', 'post-item');

        const linkToPost = document.createElement('a');
        linkToPost.href = './post.html?post_id=' + id;

        const postTitleElement = createHTMLElement('h3', 'post-title', firstLetterUpperCase(title));

        linkToPost.append(postTitleElement);

        const postTextElement = createHTMLElement('p', 'post-text', firstLetterUpperCase(body));

        postItem.prepend(linkToPost, postTextElement);
        postsList.append(postItem);
        postsWrapper.prepend(titleElement, postsList); 
    })

    return postsWrapper;
}

export function createAlbumsInfo(data) {
    const albumsWrapper = createHTMLElement('div', 'albums-wrapper');

    const titleElement = createHTMLElement('h2', 'albums-title', 'Albums:');

    const albumsList = createHTMLElement('div', 'albums-list');

    data.forEach(album => {
        let { title, id } = album;

        const albumItem = createHTMLElement('div', 'album-item');

        const linkToAlbum = document.createElement('a')
        linkToAlbum.href = './album.html?album_id=' + id;

        const albumTitleElement = createHTMLElement('h3', 'album-title', firstLetterUpperCase(title));

        linkToAlbum.append(albumTitleElement);
        albumItem.append(linkToAlbum);
        albumsList.append(albumItem);
        albumsWrapper.append(titleElement, albumsList);
    })

    return albumsWrapper;
}

export function createCommentsInfo(data) {
    const commentsWrapper = createHTMLElement('div', 'comments-wrapper');

    const titleElement = createHTMLElement('h2', 'comments-title', 'Comments:');

    const commentsList = createHTMLElement('div', 'comments-list');

    data.forEach(comment => {
        let {name, body, email} = comment;

        const commentItem = createHTMLElement('div', 'comment-item');

        const commentTitle = createHTMLElement('h3', 'comment-title', firstLetterUpperCase(name));

        const commentBody = createHTMLElement('p', 'comment-text', firstLetterUpperCase(body));

        const commentAuthor = createHTMLElement('span', 'comment-author', 'Comment author: ');

        const commentAuthorEmail = createHTMLElement('a', 'comment-author-email', email)
        commentAuthorEmail.href = `mailto:${email}`;

        commentAuthor.append(commentAuthorEmail);

        commentItem.append(commentTitle, commentBody, commentAuthor);
        commentsList.append(commentItem);
        commentsWrapper.append(titleElement, commentsList);
    })

    return commentsWrapper;
}

export function createPhotosInfo(data) {
    const photosWrapper = createHTMLElement('div', 'photos-wrapper');

    const titleElement = createHTMLElement('h2', 'photos-title', 'Photos:');

    const photosList = createHTMLElement('div', 'photos-list');
    data.forEach(photo => {
        let { title, thumbnailUrl, albumId } = photo;

        const photoItem = createHTMLElement('div', 'photo-item');

        const photoTitle = createHTMLElement('h2', 'photo-title', firstLetterUpperCase(title));

        const photoImg = document.createElement('img');
        photoImg.src = thumbnailUrl;
        photoImg.alt = title;

        const linkToAlbum = createHTMLElement('a', 'link', 'See album of this photo...');
        linkToAlbum.href = './album.html?album_id=' + albumId;

        photoItem.append(photoTitle, photoImg, linkToAlbum);
        photosList.append(photoItem);
        photosWrapper.append(titleElement, photosList);
    })

    return photosWrapper;
}