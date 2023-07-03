import { getMaterials, useMaterials } from "./materialProvider.js";

export const materialList = () => {
  render();
  eventHandler();
};

const eventHandler = () => {
  const eventHub = document.querySelector(".container");

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
