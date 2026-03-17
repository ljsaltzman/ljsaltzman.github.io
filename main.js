function projectItemHTML(item) {
  const url = `post.html?type=project&id=${item.id}`;
  const meta = item.tags?.length
    ? `<span class="project-meta">${item.tags.join(" · ")}</span>`
    : "";

  return `
    <a class="project-item" href="${url}">
      <img class="project-img" src="${item.image ?? `images/${item.id}.jpeg`}" alt="${item.title}" loading="lazy" onerror="imgFallback(this,'${item.id}')" />
      <div class="project-title">${item.title}</div>
      <div class="project-blurb">${item.blurb}</div>
      ${meta}
    </a>
  `;
}

function renderProjects(items) {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = items.length
    ? items.map(item => projectItemHTML(item)).join("")
    : `<p style="font-size:0.875rem;color:var(--muted)">Nothing here yet.</p>`;
}

renderProjects(projects);
