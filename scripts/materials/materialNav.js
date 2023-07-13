export const materialNav = () => {
  eventHandler();
  render();
};

const eventHandler = () => {
  const eventHub = document.querySelector(".container");

  eventHub.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "show-material-form") {
      document.querySelector(".material-form").classList.remove("hidden");
    }
  });
};

const render = () => {
  const targetElement = document.querySelector(".material-nav");

  targetElement.innerHTML = `
    <h1>3D printing materials</h1>
    <button id="show-material-form">Add new material</button>
    <span class="filter-bar">
        <select class="filter-select">
            <option value=0>Show all</option>
            <option value="fdm">FDM</option>
            <option value="resin">Resin</option>
        </select>
        <button id="filter-submit">Filter</button>
    </span>
    `;
};
