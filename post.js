import navigation from './navigation.js';
import { createHTMLElement, fetchData, firstLetterUpperCase, getUrlParams } from './funtions.js'
import { API_URL } from './config.js';

async function init() {
    const postWrapper = document.querySelector('.post-wrapper');

    const id = getUrlParams('post_id');

    if (!id) {
        postWrapper.innerHTML = `<h1>Something is wrong...</h1>
                                  <p>Search for more posts 
                                  <a href="./posts.html">here...</a>
                                  </p>`;
  
        return;
    }

    const postData =  await fetchData(`${API_URL}/posts/${id}/?_embed=comments&_expand=user`);
    const postItemDiv = createPost(postData);
    postWrapper.append(postItemDiv);

    const mainHeader = navigation();
    postWrapper.before(mainHeader);
}

init();

function createPost(data) {
    const postItem = createHTMLElement('div', 'post-item');
    
    let {title, user, body, comments, userId} = data;

    const postTitle = createHTMLElement('h1', 'post-title', firstLetterUpperCase(title));

    const postAuthor = createHTMLElement('a', 'post-author', user.name);
    postAuthor.href = './user.html?user_id=' + userId;

    const postText = createHTMLElement('p', 'post-text', firstLetterUpperCase(body));

    const commentsTitle = createHTMLElement('h3', 'comments-title', 'Comments:');

    const commentsList = createHTMLElement('ul', 'comments-list');

    const linkToOthersPosts = createHTMLElement('a', 'link', `Other ${user.name} posts...`);
    linkToOthersPosts.href = './posts.html?user_id=' + data.user.id;

    comments.forEach((comment, index) => {
        let {name, body, email} = comment;

        const text = `${index + 1}. ` + firstLetterUpperCase(name);
        const commentTitle = createHTMLElement('li', 'comment-title', text);

        const commentText = createHTMLElement('li', 'comment-text', firstLetterUpperCase(body));

        const commentAuthor = createHTMLElement('li', 'comment-author', 'Comment author: ');

        const commentAuthorEmail = createHTMLElement('a', 'comment-author-email', email)
        commentAuthorEmail.href = `mailto:${email}`;

        commentAuthor.append(commentAuthorEmail)

        commentsList.append(commentTitle, commentText, commentAuthor)

        postItem.append(postTitle, postAuthor, postText, commentsTitle, commentsList, linkToOthersPosts);
    })

    return postItem;
}