import { fetchData, firstLetterUpperCase, getUrlParams } from './funtions.js';

async function init() {
    const id = getUrlParams('album_id');

    const albumWrapper = document.querySelector('.album-wrapper');
    
    if (!id) {
      albumWrapper.innerHTML = `<h1>Something is wrong...</h1>
                                <p>Search for more albums 
                                <a href="./albums.html">here...</a>
                                </p>`;

      return;
    }

    const albumData = await fetchData(`https://jsonplaceholder.typicode.com/albums/${id}/?_expand=user&_embed=photos`);

    const albumList = createAlbum(albumData);

    const photosWrapper = createAlbumPhotos(albumData)

    albumWrapper.append(albumList);
    albumWrapper.after(photosWrapper);
}

init();

function createAlbum(data) {
    const albumItem = document.createElement('div');
    albumItem.classList.add('album-item');
  
    let {userId, title} = data;
    const author = data.user.name;

    const titleElement = document.createElement('h2');
    titleElement.classList.add('album-title');
    titleElement.textContent = firstLetterUpperCase(title);

    const authorLink = document.createElement('a');
    authorLink.classList.add('link');
    authorLink.href = './user.html?user_id=' + userId;
    authorLink.textContent = author;

    albumItem.append(titleElement, authorLink);

    return albumItem;
}

function createAlbumPhotos(data) {
  const photoDiv = document.createElement('div');
  photoDiv.classList.add('pswp-gallery', 'pswp-gallery--single-column');
  photoDiv.id = 'gallery--getting-started';

  data.photos.forEach(photo => {
    const photoThumbnailUrl = photo.thumbnailUrl;
    const photoUrl = photo.url;

    const photoLink = document.createElement('a');
    photoLink.href = photoUrl;
    // photoLink.setAttribute('target', '_blank');
    photoLink.dataset.pswpHeight = '600';
    photoLink.dataset.pswpWidth = '600';

    const photoItem = document.createElement('img');
    photoItem.src = photoThumbnailUrl;
    photoItem.alt = "";

    photoLink.append(photoItem);

    photoDiv.append(photoLink);
  })

  return photoDiv;
}

