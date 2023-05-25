import navigation from './navigation.js';
import { API_URL } from './config.js';
import { fetchData, firstLetterUpperCase, getUrlParams } from './funtions.js';

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
    const postsDiv = document.createElement('div');
    postsDiv.classList.add('posts-list');
    posts.forEach(postData => {
        const postId = postData.id;
        const userId = postData.userId;
        
        const postDivElement = document.createElement('div');
        postDivElement.classList.add('posts-item');

        const author = postData.user.name;
        const title = postData.title;
        const commentsNumber = postData.comments.length;

        const postTitle = document.createElement('a')
        postTitle.classList.add('post-title');
        postTitle.href = './post.html?post_id=' + postId;
        postTitle.textContent = firstLetterUpperCase(title);

        const postsComments = document.createElement('span')
        postsComments.classList.add('comments');
        postsComments.textContent = `(comments: ${commentsNumber})`;
        postTitle.append(' ', postsComments);

        const authorElement = document.createElement('a');
        authorElement.classList.add('author');
        authorElement.href = './user.html?user_id=' + userId;
        authorElement.textContent = `Author: ${author}`;

        postDivElement.append(postTitle, authorElement);
        postsDiv.append(postDivElement) 
    })

    return postsDiv;
}