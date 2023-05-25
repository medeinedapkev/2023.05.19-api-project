import { fetchData, firstLetterUpperCase } from './funtions.js';

async function init() {
    const albumsData = await fetchData('https://jsonplaceholder.typicode.com/albums?_embed=photos&_expand=user');

    const albumsWrapper = document.querySelector('#albums-wrapper');
    const albumsList = createAlbumsList(albumsData);
    albumsWrapper.prepend(albumsList);
}

init();

function createAlbumsList(albums) {
    const albumDiv = document.createElement('div');
    albumDiv.classList.add('albums-list');
    albums.forEach(album => {
        const albumId = album.id;
        const albumItemDiv = document.createElement('div');
        albumItemDiv.classList.add('album-item');

        const title = album.title;
        const author = album.user.name;
        const photosNumber = album.photos.length;
        const randomIndex = Math.floor(Math.random() * photosNumber);
        const randomPhotoAlt = album.photos[randomIndex].title;
        const randomPhotoUrl = album.photos[randomIndex].thumbnailUrl;

        const linkPhotoAlbum = document.createElement('a');
        linkPhotoAlbum.classList.add('link');
        linkPhotoAlbum.href = './album.html?album_id=' + albumId;

        const albumsTitle = document.createElement('h2');
        albumsTitle.classList.add('albums-title');
        albumsTitle.textContent = firstLetterUpperCase(title);

        const photosNumberElement = document.createElement('span');
        photosNumberElement.classList.add('photo-number');
        photosNumberElement.textContent = `(${photosNumber})`;

        albumsTitle.append(' ', photosNumberElement);

        const albumAuthor = document.createElement('p');
        albumAuthor.classList.add('albums-author');
        albumAuthor.textContent = author;

        const picture = document.createElement('img');
        picture.src = randomPhotoUrl;
        picture.alt = randomPhotoAlt;

        linkPhotoAlbum.prepend(albumsTitle, albumAuthor, picture);

        albumItemDiv.append(linkPhotoAlbum);
        albumDiv.append(albumItemDiv);
    })

    return albumDiv;
}