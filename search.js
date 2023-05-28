import navigation from "./navigation.js";
import { ALBUMS_PER_PAGE, API_URL, COMMENTS_PER_PAGE, PHOTOS_PER_PAGE, POSTS_PER_PAGE } from "./config.js";
import { createAlbumsInfo, createCommentsInfo, createHTMLElement, createPhotosInfo, createPostsInfo, createUserInfo, fetchData, getUrlParams } from "./funtions.js";

async function init() {
    const searchPageForm = document.querySelector('#local-search-form');
    const mainHeader = navigation();
    searchPageForm.before(mainHeader);

    const contentElement = document.querySelector('.content');

    const searchFor = getUrlParams('search');

    if (searchFor.length === 0) {
        const alertMessage = createHTMLElement('span', 'alert-message', 'You have to write something...');
        searchPageForm.after(alertMessage);

        return alertMessage;
    }

    const searchedUsersInfo = await fetchData(`${API_URL}/users?q=${searchFor}`);

        if (searchedUsersInfo.length > 0) {
            const userInfo = createUserInfo(searchedUsersInfo);
            contentElement.append(userInfo);
        } 

    const searchedPostsInfo = await fetchData(`${API_URL}/posts?q=${searchFor}&_limit=${POSTS_PER_PAGE}`);

        if (searchedPostsInfo.length > 0) {
            const postsInfo = createPostsInfo(searchedPostsInfo);
            contentElement.append(postsInfo);
        } 
    
    const searchedAlbumsInfo = await fetchData(`${API_URL}/albums?q=${searchFor}&_limit=${ALBUMS_PER_PAGE}`);

        if (searchedAlbumsInfo.length > 0) {
            const albumsInfo = createAlbumsInfo(searchedAlbumsInfo);
            contentElement.append(albumsInfo);
        } 

    const searchedCommentsInfo = await fetchData(`${API_URL}/comments?q=${searchFor}&_limit=${COMMENTS_PER_PAGE}`);
        
        if (searchedCommentsInfo.length > 0) {
            const commentsInfo = createCommentsInfo(searchedCommentsInfo);
            contentElement.append(commentsInfo);
        } 

    const searchedPhotosInfo = await fetchData(`${API_URL}/photos?q=${searchFor}&_limit=${PHOTOS_PER_PAGE}`);

        if (searchedPhotosInfo.length > 0) {
            const photosInfo = createPhotosInfo(searchedPhotosInfo);
            contentElement.append(photosInfo);
        } 

    if (searchedUsersInfo.length === 0 && searchedPostsInfo.length === 0 && searchedAlbumsInfo.length === 0 && searchedCommentsInfo.length === 0 && searchedPhotosInfo.length === 0) {
        notFound('Nothing found... Try something else.', contentElement);
    }
}

init();

function notFound(text, element) {
    const noFound = createHTMLElement('span', 'no-found', text);
    element.append(noFound);
}