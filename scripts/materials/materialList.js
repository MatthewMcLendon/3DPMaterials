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

  eventHub.addEventListener("click", (clickEvent) => {
    if (
      // clickEvent.target.className === "material-card" ||
      clickEvent.target.className === "material-card-image"
    ) {
      let materials = useMaterials();
      const targetElement = document.querySelector(".material-modal-hidden");

      // investigate this line of code. The arrow function ()=>{} syntax doesn't work, but using just the => does?
      const selectedMaterial = materials.filter(
        (material) =>
          material.id.toString() === clickEvent.target.parentElement.id
      );

      targetElement.innerHTML = selectedMaterial[0].renderDetail();
      targetElement.className = "material-modal-visable";
    }

    if (clickEvent.target.id === "modal-close-button") {
      const targetElement = document.querySelector(".material-modal-visable");

      targetElement.innerHTML = "";
      targetElement.className = "material-modal-hidden";
    }

    if (clickEvent.target.id === "modal-update-button") {
    }

    if (clickEvent.target.className === "modal-delete-button") {
      let materials = useMaterials();
      const targetElement = document.querySelector(".material-modal-visable");

      const selectedMaterial = materials.filter(
        (material) => `delete-${material.id}` === clickEvent.target.id
      );

      targetElement.innerHTML = "";
      targetElement.className = "material-modal-hidden";
      selectedMaterial[0].delete().then(getMaterials).then(render);
    }
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
