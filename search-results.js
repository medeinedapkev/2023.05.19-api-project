import { createHTMLElement, notFound, fetchData, createUserInfo, createPostsInfo, createAlbumsInfo, createCommentsInfo, createPhotosInfo } from './funtions.js';
import { API_URL, POSTS_PER_PAGE, ALBUMS_PER_PAGE, COMMENTS_PER_PAGE, PHOTOS_PER_PAGE } from './config.js';

async function searchResults(searchFor, parentElement) {

    parentElement.innerHTML = '';

    if (searchFor.length === 0) {
        const alertMessage = createHTMLElement('span', 'alert-message', 'You have to write something...');
        parentElement.append(alertMessage);

        return alertMessage;
    }

    const searchedUsersInfo = await fetchData(`${API_URL}/users?q=${searchFor}`);

        if (searchedUsersInfo.length > 0) {
            const userInfo = createUserInfo(searchedUsersInfo);
            parentElement.append(userInfo);
        } 

    const searchedPostsInfo = await fetchData(`${API_URL}/posts?q=${searchFor}&_limit=${POSTS_PER_PAGE}`);

        if (searchedPostsInfo.length > 0) {
            const postsInfo = createPostsInfo(searchedPostsInfo);
            parentElement.append(postsInfo);
        } 
    
    const searchedAlbumsInfo = await fetchData(`${API_URL}/albums?q=${searchFor}&_limit=${ALBUMS_PER_PAGE}`);

        if (searchedAlbumsInfo.length > 0) {
            const albumsInfo = createAlbumsInfo(searchedAlbumsInfo);
            parentElement.append(albumsInfo);
        } 

    const searchedCommentsInfo = await fetchData(`${API_URL}/comments?q=${searchFor}&_limit=${COMMENTS_PER_PAGE}`);
        
        if (searchedCommentsInfo.length > 0) {
            const commentsInfo = createCommentsInfo(searchedCommentsInfo);
            parentElement.append(commentsInfo);
        } 

    const searchedPhotosInfo = await fetchData(`${API_URL}/photos?q=${searchFor}&_limit=${PHOTOS_PER_PAGE}`);

        if (searchedPhotosInfo.length > 0) {
            const photosInfo = createPhotosInfo(searchedPhotosInfo);
            parentElement.append(photosInfo);
        } 

    if (searchedUsersInfo.length === 0 && searchedPostsInfo.length === 0 && searchedAlbumsInfo.length === 0 && searchedCommentsInfo.length === 0 && searchedPhotosInfo.length === 0) {
        notFound('Nothing found... Try something else.', parentElement);
    }

    return parentElement;
}

export default searchResults;