import { materialForm } from "./materials/materialForm.js";
import { getMaterials } from "./materials/materialProvider.js";
import { materialList } from "./materials/materialList.js";
import { navBar } from "./navigation/navBar.js";

getMaterials().then(navBar).then(materialForm).then(materialList);
