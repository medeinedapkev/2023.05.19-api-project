import navigation from "./navigation.js";
import { ALBUMS_PER_PAGE, API_URL, COMMENTS_PER_PAGE, PHOTOS_PER_PAGE, POSTS_PER_PAGE } from "./config.js";
import { createAlbumsInfo, createCommentsInfo, createHTMLElement, createPhotosInfo, createPostsInfo, createUserInfo, fetchData, getUrlParams } from "./funtions.js";

async function init() {
    const contentElement = document.querySelector('.content');
    const mainHeader = navigation();
    contentElement.before(mainHeader);

    const searchFor = getUrlParams('search');

    const searchedUsersInfo = await fetchData(`${API_URL}/users?q=${searchFor}`);

        if (searchedUsersInfo.length > 0) {
            const userInfo = createUserInfo(searchedUsersInfo);
            contentElement.append(userInfo);
        } else {
            const noFound = createHTMLElement('span', 'no-found', 'No users found');
            contentElement.append(noFound);
        }

    const searchedPostsInfo = await fetchData(`${API_URL}/posts?q=${searchFor}&_limit=${POSTS_PER_PAGE}`);

        if (searchedPostsInfo.length > 0) {
            const postsInfo = createPostsInfo(searchedPostsInfo);
            contentElement.append(postsInfo);
        } else {
            const noFound = createHTMLElement('span', 'no-found', 'No posts found');
            contentElement.append(noFound);
        }
    
    const searchedAlbumsInfo = await fetchData(`${API_URL}/albums?q=${searchFor}&_limit=${ALBUMS_PER_PAGE}`);

        if (searchedAlbumsInfo.length > 0) {
            const albumsInfo = createAlbumsInfo(searchedAlbumsInfo);
            contentElement.append(albumsInfo);
        } else {
            const noFound = createHTMLElement('span', 'no-found', 'No albums found');
            contentElement.append(noFound);
        }

    const searchedCommentsInfo = await fetchData(`${API_URL}/comments?q=${searchFor}&_limit=${COMMENTS_PER_PAGE}`);
        
        if (searchedCommentsInfo.length > 0) {
            const commentsInfo = createCommentsInfo(searchedCommentsInfo);
            contentElement.append(commentsInfo);
        } else {
            const noFound = createHTMLElement('span', 'no-found', 'No comments found');
            contentElement.append(noFound);
        }

    const searchedPhotosInfo = await fetchData(`${API_URL}/photos?q=${searchFor}&_limit=${PHOTOS_PER_PAGE}`);

        if (searchedPhotosInfo.length > 0) {
            const photosInfo = createPhotosInfo(searchedPhotosInfo);
            contentElement.append(photosInfo);
        } else {
            const noFound = createHTMLElement('span', 'no-found', 'No photos found');
            contentElement.append(noFound);
        }
}

init();

