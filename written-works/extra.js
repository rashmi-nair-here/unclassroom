async function fetchPosts() {
    try {
        const response = await fetch('/unclassroom/written-works/posts.json');
        if (!response.ok) {
            throw new Error('Network response was not okay');
        }

        const data = await response.json();

        const currentFile = window.location.pathname.split('/').pop();
        const post = data.find(p =>
            p.meta.url.includes(currentFile)
        );

        const returnPostDate = (date) => `${
            ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
            [date.getMonth()]}
            ${date.getDate()}, ${date.getFullYear()}`

        const heading = document.getElementById('header');
        const author = document.getElementById('author');
        const date = document.getElementById('date');
        if (post) {
            heading.textContent = post.title;
            author.innerHTML = `${post.user.name[0].firstName} ${post.user.name[1].lastName}`;
            date.textContent = returnPostDate(new Date(post.meta.date));
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


fetchPosts();
