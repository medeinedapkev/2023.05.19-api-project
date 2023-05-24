async function init() {
    const queryParams = location.search;
    const urlParams = new URLSearchParams(queryParams);
    
    const id = urlParams.get('post_id');

    const postWrapper = document.querySelector('.post-wrapper');

    if (!id) {
        postWrapper.innerHTML = `<h1>Something is wrong...</h1>
                                  <p>Search for more posts 
                                  <a href="./posts.html">here...</a>
                                  </p>`;
  
        return;
    }

    const postDataResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/?_embed=comments&_expand=user`);
    const postData =  await postDataResponse.json();

    postWrapper.classList.add('post-wrapper');

    const postItemDiv = createPost(postData);

    postWrapper.append(postItemDiv);
}

init();

function createPost(data) {
    const postItem = document.createElement('div');
    postItem.classList.add('post-item');
    
    let {title, user, body, comments} = data;

    const postTitle = document.createElement('h1');
    postTitle.classList.add('post-title');
    postTitle.textContent = title;

    const postAuthor = document.createElement('a');
    postAuthor.classList.add('post-author');
    postAuthor.href = './user.html';
    postAuthor.textContent = user.name

    const postText = document.createElement('p');
    postText.classList.add('post-text');
    postText.textContent = body;

    const commentsTitle = document.createElement('h3');
    commentsTitle.classList.add('comments-title');
    commentsTitle.textContent = 'Comments:';

    const commentsList = document.createElement('ul');
    commentsList.classList.add('comments-list');

    const linkToOthersPosts = document.createElement('a');
    linkToOthersPosts.classList.add('link');
    linkToOthersPosts.href = './posts.html?user_id=' + data.user.id;
    linkToOthersPosts.textContent = `Other ${user.name} posts...`;

    comments.forEach((comment, index) => {
        let {name, body, email} = comment;

        const commentTitle = document.createElement('li');
        commentTitle.classList.add('comment-title');
        commentTitle.textContent = `${index + 1}. ${name}`;

        const commentText = document.createElement('li');
        commentText.classList.add('comment-text');
        commentText.textContent = body;

        const commentAuthor = document.createElement('li');
        commentAuthor.classList.add('comment-author');
        commentAuthor.textContent = 'Comment author: '
        const commentAuthorEmail = document.createElement('a');
        commentAuthorEmail.href = `mailto:${email}`;
        commentAuthorEmail.textContent = email;
        commentAuthor.append(commentAuthorEmail)

        commentsList.append(commentTitle, commentText, commentAuthor)

        postItem.append(postTitle, postAuthor, postText, commentsTitle, commentsList, linkToOthersPosts);
    })

    return postItem;
}