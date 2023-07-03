import { getMaterials, useMaterials } from "./materialProvider.js";

export const materialList = () => {
  const eventHub = document.querySelector(".container");

  render();

  eventHub.addEventListener("materialFormSubmit", (event) => {
    getMaterials().then(render);
  });
};

const render = () => {
  let materials = useMaterials();
  let targetElement = document.querySelector(".material-list");

  targetElement.innerHTML = materials
    .map((material) => {
      return material.render();
    })
    .join("");
};
