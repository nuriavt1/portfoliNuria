export function createProjectCard(project, category) {
  const card = document.createElement("div");
  card.classList.add("project-card");

  card.innerHTML = `
    <div class="image-wrapper">
      <img src="${project.img || 'img/placeholder.jpg'}" alt="${project.title}" />
      <div class="overlay">
        <div class="overlay-text">
          <p class="category">${category.toUpperCase()}</p>
          <h4>${project.title}</h4>
          <p class="short-desc">${project.description || ''}</p>
          ${project.link ? `<a href="${project.link}" target="_blank" class="btn-more">MORE ABOUT</a>` : ""}
        </div>
      </div>
    </div>
    <p class="project-title">${project.title}</p>
  `;

  // 👉 Evento de click para redirigir con el id
  card.addEventListener("click", () => {
    window.location.href = `detail.html?id=${project.id}`;
  });

  return card;
}
