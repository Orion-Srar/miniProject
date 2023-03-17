const url = new URL(location.href);
const userid = url.searchParams.get('userid');

async function foo() {
    const user = await fetch(`https://jsonplaceholder.typicode.com/users/${userid}`).then(response => response.json());
    const wrap = document.createElement('div');
    wrap.setAttribute('id', 'wrap');

    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    wrap.appendChild(container);

    const userDiv = document.createElement('div');
    userDiv.setAttribute('id', 'user');
    container.appendChild(userDiv);

    function openUser(obj) {
        for (const key in obj) {
            const objElement = obj[key];

            if ((typeof objElement) === 'object') {
                const div2 = document.createElement('div');
                div2.innerText = `${key}:`
                userDiv.appendChild(div2);
                openUser(objElement);
            } else {
                const div = document.createElement('div');
                div.innerText = `${key}: ${objElement}`;
                userDiv.appendChild(div);
            }
        }
    }

    openUser(user);

    fetch(` https://jsonplaceholder.typicode.com/users/${userid}/posts`)
        .then(response => response.json())
        .then(posts => {
            const divPosts = document.createElement('div');
            divPosts.setAttribute('class', 'posts visible');
            wrap.appendChild(divPosts);

            for (const post of posts) {

                const postDiv = document.createElement('div');
                postDiv.setAttribute('id', 'post');
                postDiv.innerText = `${post.id}.${post.title}`;

                const button = document.createElement('button');
                button.innerText = 'Post details';
                postDiv.appendChild(button);

                button.onclick = function () {
                    localStorage.setItem('posts', JSON.stringify(posts));
                    location.href = `post-details.html?userId=${user.id}&postId=${post.id}`
                }
                divPosts.appendChild(postDiv);
            }
        });

    const button = document.createElement('button');
    button.innerText = 'Post of current user';
    container.appendChild(button);


    button.onclick = function () {
        const postsDiv = document.querySelector('.posts');
        console.log(postsDiv);
        postsDiv.classList.toggle('visible');

    }

    document.body.appendChild(wrap);
}


foo();