async function foo() {
    const usersArray = await fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());

    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    document.body.appendChild(container);

    for (const user of usersArray) {
        const wrap = document.createElement('div');
        wrap.setAttribute('id', 'wrap');

        const div = document.createElement('div');
        div.setAttribute('id', 'name');
        div.innerText = `${user.id}. ${user.name}`

        const button = document.createElement('button');
        button.innerText = 'Details';

        container.appendChild(wrap);
        wrap.append(div, button);

        button.onclick = function () {
            location.href = `user-details.html?userid=${user.id}`;
        };
    }
}

foo();