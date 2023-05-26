import navigation from './navigation.js';
import { API_URL } from './config.js';
import { createHTMLElement, fetchData, firstLetterUpperCase, getUrlParams } from './funtions.js';

async function init() {
    const postsWrapper = document.querySelector('#posts-wrapper');

    const id = getUrlParams('user_id');

    let fetchUrl;
    if (id) {
        fetchUrl = `${API_URL}/posts?_embed=comments&_expand=user&userId=${id}`;
    } else {
        fetchUrl = `${API_URL}/posts?_embed=comments&_expand=user`;
    }
    
    const postsData = await fetchData(fetchUrl);
    const postsList =  createPostsList(postsData);
    postsWrapper.append(postsList);

    const mainHeader = navigation();
    postsWrapper.before(mainHeader);
}

init();

function createPostsList(posts) {
    const postsDiv = createHTMLElement('div', 'posts-list');

    posts.forEach(postData => {
        const postId = postData.id;
        const userId = postData.userId;
        
        const postDivElement = createHTMLElement('div', 'posts-item');

        const author = postData.user.name;
        const title = postData.title;
        const commentsNumber = postData.comments.length;

        const postTitle = createHTMLElement('a', 'post-title', firstLetterUpperCase(title));
        postTitle.href = './post.html?post_id=' + postId;


        const postsComments = createHTMLElement('span', 'comments', `(comments: ${commentsNumber})`);
        postTitle.append(' ', postsComments);

        const authorElement = createHTMLElement('a', 'author', `Author: ${author}`);
        authorElement.href = './user.html?user_id=' + userId;

        postDivElement.append(postTitle, authorElement);
        postsDiv.append(postDivElement) 
    })

    return postsDiv;
}