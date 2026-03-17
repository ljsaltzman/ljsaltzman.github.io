const params = new URLSearchParams(window.location.search);
const type = params.get("type");
const id = params.get("id");

const collection = type === "essay" ? essays : projects;
const item = collection.find(x => x.id === id);

document.getElementById("year").textContent = new Date().getFullYear();

if (!item) {
  document.getElementById("post-main").innerHTML = `<p style="padding:2rem">Item not found.</p>`;
} else {
  document.title = `${item.title} — Levi Saltzman`;

  const sectionLabel = type === "essay" ? "Essays" : "Projects";
  const sectionAnchor = type === "essay" ? "#essays" : "#projects";
  document.getElementById("post-back-nav").innerHTML =
    `<a href="index.html${sectionAnchor}">← ${sectionLabel}</a>`;

  const meta = type === "essay"
    ? `<span class="post-meta">${item.date}</span>`
    : item.tags?.length
      ? `<span class="post-meta">${item.tags.join(" · ")}</span>`
      : "";

  const repoLink = item.repoUrl
    ? `<a class="post-repo" href="${item.repoUrl}" target="_blank" rel="noopener">GitHub ↗</a>`
    : "";

  document.getElementById("post-main").innerHTML = `
    <div class="post-hero">
      <img class="post-img" src="${item.image ?? `images/${item.id}.jpeg`}" alt="${item.title}" onerror="imgFallback(this,'${item.id}')" />
    </div>
    <div class="post-body">
      <h1 class="post-title">${item.title}</h1>
      <div class="post-header-meta">${meta}${repoLink}</div>
      <div class="post-content" id="post-content">Loading…</div>
    </div>
  `;

  fetch(item.content)
    .then(r => {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    })
    .then(html => {
      document.getElementById("post-content").innerHTML = html;
    })
    .catch(() => {
      document.getElementById("post-content").innerHTML =
        `<p style="color:var(--muted)">Content file not found: <code>${item.content}</code></p>`;
    });
}
