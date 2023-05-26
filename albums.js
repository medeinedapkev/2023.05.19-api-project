import navigation from './navigation.js';
import { createHTMLElement, fetchData, firstLetterUpperCase } from './funtions.js';
import { API_URL } from './config.js';

async function init() {
    const albumsData = await fetchData(`${API_URL}/albums?_embed=photos&_expand=user`);

    const albumsWrapper = document.querySelector('#albums-wrapper');
    const albumsList = createAlbumsList(albumsData);
    albumsWrapper.prepend(albumsList);

    const mainHeader = navigation();
    albumsWrapper.before(mainHeader);
}

init();

function createAlbumsList(albums) {
    const albumDiv = createHTMLElement('div', 'albums-list');

    albums.forEach(album => {
        const albumId = album.id;

        const albumItemDiv = createHTMLElement('div', 'album-item');

        const title = album.title;
        const author = album.user.name;
        const photosNumber = album.photos.length;
        const randomIndex = Math.floor(Math.random() * photosNumber);
        const randomPhotoAlt = album.photos[randomIndex].title;
        const randomPhotoUrl = album.photos[randomIndex].thumbnailUrl;

        const linkPhotoAlbum = createHTMLElement('a', 'link');
        linkPhotoAlbum.href = './album.html?album_id=' + albumId;

        const albumsTitle = createHTMLElement('h2', 'albums-title', firstLetterUpperCase(title));

        const photosNumberElement = createHTMLElement('span', 'photo-number', `(${photosNumber})`);

        albumsTitle.append(' ', photosNumberElement);

        const albumAuthor = createHTMLElement('p', 'albums-author', author);

        const picture = document.createElement('img');
        picture.src = randomPhotoUrl;
        picture.alt = randomPhotoAlt;

        linkPhotoAlbum.prepend(albumsTitle, albumAuthor, picture);

        albumItemDiv.append(linkPhotoAlbum);
        albumDiv.append(albumItemDiv);
    })

    return albumDiv;
}