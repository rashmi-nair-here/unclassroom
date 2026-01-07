let posts = [];
let filteredPosts = [];
const POSTS_TO_SHOW = 3;
let maxDisplayLimit = POSTS_TO_SHOW;
const postContainer = document.querySelector('.post-container');
const search = document.getElementById('search');

function generatePost(post) {
    const returnPostDate = (date) => `${
        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        [date.getMonth()]}
        ${date.getDate()}, ${date.getFullYear()}`

    const article = document.createElement('article');
    article.classList.add('post');
    article.innerHTML = `
        <div class="post-head">
            <div class="tag-container">
                ${post.meta.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <p class="date">
                ${returnPostDate(new Date(post.meta.date))}
            </p>
        </div>
            <h2 class="title"><a href="${post.meta.url}">${post.title}</a></h2>
            <div class="author">
                <img alt="${post.user.name[0].firstName} ${post.user.name[1].lastName}" src="${post.meta.author.avatar}" class="author-avatar"></img>
                <p class="author-name">${post.user.name[0].firstName} ${post.user.name[1].lastName}</p>
            </div>
        <div class="post-desc">
            <p class="">${post.summary}</p>
        </div>
        <button class="btn"><a href="${post.meta.url}">Read More</a></button>
    `;
    return article;
}

const seeMoreBtn = document.getElementById('btn--view');

function loadPosts(items = filteredPosts) {
    postContainer.innerHTML = '';

    if (!items.length) {
        const msg = document.createElement('h2');
        msg.setAttribute('aria-live', 'polite');
        msg.style.textAlign = 'center';
        msg.style.marginBottom = 0;
        msg.style.gridColumn = 2;
        msg.textContent = `No results found for "${search ? search.value : ''}"`;
        
        const breakElement = document.createElement('br');

        const subtext = document.createElement('p');
        subtext.setAttribute('aria-live', 'polite');
        subtext.style.textAlign = 'center';
        subtext.style.gridColumn = 2;
        subtext.textContent = `Please make sure your words are spelled correctly, or use more/fewer keywords.`;
        
        postContainer.appendChild(msg);
        postContainer.appendChild(breakElement);
        postContainer.appendChild(subtext);
        seeMoreBtn.style.display = 'none';
        return;
    }
    seeMoreBtn.style.display = 'block';

    const frag = document.createDocumentFragment();
    items.slice(0, maxDisplayLimit).forEach(post => frag.appendChild(generatePost(post)));
    postContainer.appendChild(frag);
}

function searchPosts() {
    maxDisplayLimit = POSTS_TO_SHOW;
    const term = search.value.toLowerCase();
    const searchFilter = post =>
        [post.title, post.summary, post.user.name[0].firstName, post.user.name[1].lastName, post.meta.tags.join(' ')]
        .join('')
        .toLowerCase()
        .includes(term);
    filteredPosts = posts.filter(searchFilter);
    loadPosts();
}

async function fetchPosts() {
    await fetch('../written-works/posts.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not okay.')
            }
            return response.json();
        })
        .then((data) => {
            posts = data.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
            filteredPosts = posts.slice();
            searchPosts();
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation: ', error);
        })
}
fetchPosts();

function viewMorePosts() {
    maxDisplayLimit += POSTS_TO_SHOW;
    loadPosts();
}

seeMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    viewMorePosts();
});

if (search) {
  search.addEventListener('keyup', searchPosts);
}