(() => {
  const outline = document.querySelector(".article-toc");
  const headings = document.querySelectorAll(".article-body :is(h2, h3, h4, h5, h6)");
  if (!headings.length) return;

  const parents = [{ level: 1, list: outline.querySelector("ul") }];
  let section = 1;
  for (const heading of headings) {
    if (!heading.id) {
      while (document.getElementById(`section-${section}`)) section++;
      heading.id = `section-${section++}`;
    }

    const level = Number(heading.tagName[1]);
    while (parents.at(-1).level >= level) parents.pop();
    const parent = parents.at(-1);
    if (!parent.list) parent.list = parent.item.appendChild(document.createElement("ul"));

    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${encodeURIComponent(heading.id)}`;
    link.textContent = heading.textContent;
    item.append(link);
    parent.list.append(item);
    parents.push({ level, item });
  }
  outline.hidden = false;
})();
