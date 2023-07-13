import { materialForm } from "./materials/materialForm.js";
import { getMaterials } from "./materials/materialProvider.js";
import { materialList } from "./materials/materialList.js";
import { materialNav } from "./materials/materialNav.js";

getMaterials().then(materialNav).then(materialForm).then(materialList);
