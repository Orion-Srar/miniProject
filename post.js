const url = new URL(location.href);
const postId = url.searchParams.get('postId');

const posts = JSON.parse(localStorage.getItem('posts'));
const post = posts.find(post => post.id = postId);

const container = document.createElement('div');
container.setAttribute('id', 'container');
document.body.appendChild(container);

const postDiv = document.createElement('div');
container.appendChild(postDiv);
postDiv.setAttribute('id', 'wrap');
postDiv.innerHTML = `<h3>${post.id}.${post.title}</h3><div>${post.body}</div>`

const title = document.createElement('div');
title.setAttribute('id', 'title');
title.innerHTML = `<h3>Comments chosen posts</h3>`
container.appendChild(title);

const commentsDiv = document.createElement('div');
commentsDiv.setAttribute('id', 'comments');
container.appendChild(commentsDiv);

async function foo() {
    const comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then(response => response.json());
    for (const comment of comments) {

        const commentDiv = document.createElement('div');
        commentDiv.setAttribute('id', 'comment');
        commentsDiv.appendChild(commentDiv);
        commentDiv.innerHTML = `<h4>${comment.id}.${comment.name}</h4><div>${comment.email}</div><div>${comment.body}</div>`
        console.log(comment);
    }
}

foo();