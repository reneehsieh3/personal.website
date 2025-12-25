let allProjects = [];
let chosen_filter = [];

document.addEventListener("DOMContentLoaded", () => {
  allProjects = projectsData;

  chosen_filter = [];
  renderCards(allProjects);

  const selector = document.getElementById("projectsSelector");
  selector.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter_button");
    if (!btn) return;

    const selected = btn.dataset.tag;

    if (selected === "all") {
      chosen_filter = [];
      setAllActive(true);
    } else {
      setAllActive(false);

      if (chosen_filter.includes(selected)) {
        chosen_filter = chosen_filter.filter(t => t !== selected);
        btn.classList.remove("is-active");
      } else {
        chosen_filter.push(selected);
        btn.classList.add("is-active");
      }

      if (chosen_filter.length === 0) {
        setAllActive(true);
      }
    }

    applyFilterAndRender();
  });
});

function setAllActive(isOn){
  const allBtn = document.querySelector('.filter_button[data-tag="all"]');
  const allButtons = document.querySelectorAll('.filter_button');

  if (isOn) {
    allButtons.forEach(b => b.classList.remove("is-active"));
    allBtn.classList.add("is-active");
  } else {
    allBtn.classList.remove("is-active");
  }
}

function applyFilterAndRender(){
  const filtered = allProjects.filter(p => {
    if (chosen_filter.length === 0) return true;
    return chosen_filter.some(tag => p.tags.includes(tag));
  });

  renderCards(filtered);
}

function renderCards(data){
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";

  data.forEach(project => {
    const card = `
      <article class="project-card">
        <img src="${project.image}" alt="${project.name}">
        <div class="project-info">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <div class="project-tags">${project.tags.join(" · ")}</div>
        </div>
      </article>
    `;
    grid.insertAdjacentHTML("beforeend", card);
  });
}