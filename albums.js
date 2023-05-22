async function init() {
    const albumsResponse = await fetch('https://jsonplaceholder.typicode.com/albums?_embed=photos&_expand=user');
    const albumsData = await albumsResponse.json();
    const albumsWrapper = document.querySelector('#albums-wrapper');
    const albumsList = createAlbumsList(albumsData);
    albumsWrapper.prepend(albumsList);

}

init();

function createAlbumsList(albums) {
    const albumDiv = document.createElement('div');
    albumDiv.classList.add('albums-list');
    albums.forEach(album => {

        const albumItemDiv = document.createElement('div');
        albumItemDiv.classList.add('album-item');

        const title = album.title;
        const author = album.user.name;
        const photosNumber = album.photos.length;
        const firstPhoto = album.photos[0].url;

        const albumsTitle = document.createElement('h2');
        albumsTitle.classList.add('albums-title');
        albumsTitle.textContent = title;

        const photosNumberElement = document.createElement('span');
        photosNumberElement.classList.add('photo-number');
        photosNumberElement.textContent = `(${photosNumber})`;

        albumsTitle.append(' ', photosNumberElement);

        const albumAuthor = document.createElement('p');
        albumAuthor.classList.add('albums-author');
        albumAuthor.textContent = author;

        const linkPhotoAlbum = document.createElement('a');
        linkPhotoAlbum.href = '#';
        const picture = document.createElement('img');
        picture.src = firstPhoto;
        linkPhotoAlbum.prepend(picture);

        albumItemDiv.append(albumsTitle, albumAuthor, linkPhotoAlbum);
        albumDiv.append(albumItemDiv);
    })

    return albumDiv;
}