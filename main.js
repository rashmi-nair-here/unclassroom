fetch("./unclassroom/written-works/posts.json")
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return res.json();
  })
  .then(posts => {
    const articles = document.querySelectorAll(".post");

    articles.forEach(article => {
      const title = article.dataset.articleTitle;
      const post = posts.find(p => p.title === title);
      if (!post) return;

      article.querySelector(".title").textContent = post.title;

      article.querySelector(".tag-container").innerHTML =
        post.meta.tags.map(tag => `<span class="tag">${tag}</span>`).join("");

      article.querySelector(".author-name").textContent =
        `${post.user.name[0].firstName} ${post.user.name[1].lastName}`;

      article.querySelector(".author-avatar").src = post.user.avatar;
      article.querySelector(".post-desc").innerHTML = post.summary;

      article.querySelector(".btn").onclick = () => {
        window.location.href = post.meta.url;
      };
    });
  })
  .catch(err => console.error("JSON load failed:", err));




