(() => {
  const input = document.getElementById("post-search");
  const clearTag = document.querySelector(".clear-tag");
  const status = document.getElementById("search-status");
  const tag = new URLSearchParams(location.search).get("tag");
  const normalize = value => value.normalize("NFKC").trim().toLowerCase();
  const posts = Array.from(document.querySelectorAll(".post-list > li"), item => ({
    item,
    text: normalize(Array.from(item.querySelectorAll("h2, time, .post-tag, .post-excerpt"))
      .map(element => element.textContent).join(" ")),
    tags: Array.from(item.querySelectorAll(".post-tag"), link => link.textContent.trim()),
  }));

  function filterPosts() {
    const terms = normalize(input.value).split(/\s+/);
    let hasResults = false;
    for (const post of posts) {
      const matches = (!tag || post.tags.includes(tag)) && terms.every(term => post.text.includes(term));
      post.item.hidden = !matches;
      hasResults ||= matches;
    }
    status.textContent = hasResults ? "" : "没有找到文章";
  }

  if (tag) {
    clearTag.textContent = `${tag} ×`;
    clearTag.setAttribute("aria-label", `清除标签：${tag}`);
    clearTag.hidden = false;
  }
  input.closest(".blog-search").hidden = false;
  input.addEventListener("input", filterPosts);
  window.addEventListener("pageshow", filterPosts);
  filterPosts();
})();
