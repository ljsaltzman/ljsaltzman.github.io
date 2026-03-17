function tileHTML(item, type) {
  const url = `post.html?type=${type}&id=${item.id}`;
  const meta = type === "essay"
    ? `<span class="tile-meta">${item.date}</span>`
    : item.tags?.length
      ? `<span class="tile-meta">${item.tags.join(" · ")}</span>`
      : "";

  return `
    <a class="tile" href="${url}">
      <img class="tile-img" src="${item.image ?? `images/${item.id}.jpeg`}" alt="${item.title}" loading="lazy" onerror="imgFallback(this,'${item.id}')" />
      <div class="tile-body">
        <div class="tile-title">${item.title}</div>
        <div class="tile-blurb">${item.blurb}</div>
        ${meta}
      </div>
    </a>
  `;
}

function render(items, type, gridId) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = items.length
    ? items.map(item => tileHTML(item, type)).join("")
    : `<p class="tile-empty">Nothing here yet.</p>`;
}

document.getElementById("year").textContent = new Date().getFullYear();
render(essays, "essay", "essays-grid");
render(projects, "project", "projects-grid");
