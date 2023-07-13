import { setForm } from "./materialForm.js";
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
      const targetElement = document.querySelector(".material-modal");

      const selectedMaterial = materials.filter(
        (material) =>
          material.id.toString() === clickEvent.target.parentElement.id
      );

      targetElement.innerHTML = selectedMaterial[0].renderDetail();
    }

    if (clickEvent.target.id === "modal-close-button") {
      const targetElement = document.querySelector(".material-modal");

      targetElement.innerHTML = "";
    }

    if (clickEvent.target.className === "modal-update-button") {
      let materials = useMaterials();
      const targetElement = document.querySelector(".material-modal-visable");

      const selectedMaterial = materials.filter(
        (material) => `update-${material.id}` === clickEvent.target.id
      );

      setForm(selectedMaterial);
      targetElement.innerHTML = "";
      targetElement.className = "material-modal-hidden";
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

    if (clickEvent.target.id === "filter-submit") {
      const filter = document.querySelector(".filter-select").value;
      let materials = useMaterials();

      if (filter === "0") {
        return render();
      }

      let filteredMaterials = materials.filter(
        (material) => material.type === filter
      );
      render(filteredMaterials);
    }
  });
};

const render = (inputMaterials) => {
  let materials = inputMaterials;
  let targetElement = document.querySelector(".material-list");

  if (!inputMaterials) {
    materials = useMaterials();
  }

  targetElement.innerHTML = materials
    .map((material) => {
      return material.render();
    })
    .join("");
};
