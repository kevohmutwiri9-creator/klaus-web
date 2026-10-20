const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");
const projectGrid = document.querySelector("#projectGrid");
const projectStatus = document.querySelector("#projectStatus");
const githubProfile = "https://github.com/kevohmutwiri9-creator";

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

async function loadProjects() {
  try {
    const response = await fetch(
      "https://api.github.com/users/kevohmutwiri9-creator/repos?type=owner&sort=updated&per_page=100",
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("GitHub returned an unexpected project list");
    }

    const projects = repositories.filter((repository) => !repository.fork);
    if (projects.length === 0) {
      projectStatus.textContent = "No public projects found yet. Visit GitHub to see my latest work.";
      return;
    }

    projectGrid.replaceChildren(...projects.map((repository, index) => {
      const card = document.createElement("article");
      card.className = "project-card";

      const art = document.createElement("div");
      art.className = "project-art github-project-art";
      const artLabel = document.createElement("span");
      artLabel.className = "project-art-label";
      artLabel.textContent = `${String(index + 1).padStart(2, "0")} / GITHUB PROJECT`;
      const language = document.createElement("span");
      language.className = "github-project-language";
      language.textContent = repository.language || "Open source";
      art.append(language, artLabel);

      const info = document.createElement("div");
      info.className = "project-info";
      const details = document.createElement("div");
      const type = document.createElement("p");
      type.className = "project-type";
      type.textContent = "PUBLIC REPOSITORY";
      const title = document.createElement("h3");
      title.textContent = repository.name;
      const description = document.createElement("p");
      description.textContent = repository.description || "Explore the source code and details on GitHub.";
      const tags = document.createElement("div");
      tags.className = "project-tags";
      (repository.topics || []).slice(0, 3).forEach((topic) => {
        const tag = document.createElement("span");
        tag.textContent = topic;
        tags.append(tag);
      });
      if (repository.stargazers_count > 0) {
        const stars = document.createElement("span");
        stars.textContent = `${repository.stargazers_count} stars`;
        tags.append(stars);
      }
      details.append(type, title, description, tags);

      const link = document.createElement("a");
      link.className = "project-link";
      link.href = repository.html_url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.setAttribute("aria-label", `Open ${repository.name} on GitHub`);
      link.textContent = "↗";
      info.append(details, link);
      card.append(art, info);
      return card;
    }));
    projectStatus.textContent = `Showing ${projects.length} public ${projects.length === 1 ? "project" : "projects"} from GitHub.`;
  } catch (error) {
    projectStatus.textContent = "Projects could not be loaded from GitHub right now. You can still browse them on GitHub.";
    const link = document.createElement("a");
    link.href = githubProfile;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = " Open GitHub ↗";
    projectStatus.append(link);
    console.error("Unable to load GitHub projects:", error);
  }
}

loadProjects();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
