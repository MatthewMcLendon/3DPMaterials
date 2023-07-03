import { Resin, Fdm } from "./material.js";
let materials = [];

export const useMaterials = () => {
  return materials;
};

export const getMaterials = () => {
  return fetch(`http://localhost:8088/materials`)
    .then((response) => response.json())
    .then((response) => {
      materials = [];
      response.map((material) => {
        if (material.type === "resin") {
          materials.push(new Resin(material));
        }
        if (material.type === "fdm") {
          materials.push(new Fdm(material));
        }
      });
    });
};
