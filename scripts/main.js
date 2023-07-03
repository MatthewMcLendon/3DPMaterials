import { materialForm } from "./materials/materialForm.js";
import { getMaterials } from "./materials/materialProvider.js";
import { materialList } from "./materials/materialList.js";

getMaterials().then(materialForm).then(materialList);
