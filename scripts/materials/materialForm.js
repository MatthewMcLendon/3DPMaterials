import { Resin, Fdm } from "./material.js";

export const materialForm = () => {
  render();
  eventHandler();
};

const eventHandler = () => {
  const eventHub = document.querySelector(".container");
  eventHub.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "material-form-submit") {
      clickEvent.preventDefault();

      makeMaterial();
      render();
    }

    if (clickEvent.target.id === "material-form-update") {
      const button = document.querySelector("#material-form-update");
      button.id = "material-form-submit";
      button.innerHTML = "Submit";
      // Continue from here. Need to get material and update with new values. Then, rerender the form, get the materials, and list them.
    }
  });

  eventHub.addEventListener("change", (changeEvent) => {
    if (changeEvent.target.id === "material-form-type") {
      settingSelector();
    }
  });
};

export const updateForm = (materialToUpdate) => {
  document.querySelector(
    ".material-form-title"
  ).innerHTML = `Update ${materialToUpdate[0].title}`;
  document.querySelector("#material-form-title").value =
    materialToUpdate[0].title;
  document.querySelector("#material-form-store").value =
    materialToUpdate[0].storeLink;
  document.querySelector("#material-form-image").value =
    materialToUpdate[0].image;
  document.querySelector("#material-form-price").value =
    materialToUpdate[0].price;
  document.querySelector("#material-form-stock").value =
    materialToUpdate[0].stock;
  const button = document.querySelector("#material-form-submit");
  button.id = "material-form-update";
  button.innerHTML = "Update";

  if (materialToUpdate[0].type === "resin") {
    document.querySelector("#material-form-type").value =
      materialToUpdate[0].type;

    settingSelector();

    document.querySelector("#material-form-resin-burnInLayerCount").value =
      materialToUpdate[0].settings.burnIn.layerCount;
    document.querySelector("#material-form-resin-burnInExposureTime").value =
      materialToUpdate[0].settings.burnIn.exposureTime;
    document.querySelector(
      "#material-form-resin-burnInTransitionLayerCount"
    ).value = materialToUpdate[0].settings.burnIn.transitionLayers;
    document.querySelector("#material-form-resin-burnInLightOffDelay").value =
      materialToUpdate[0].settings.burnIn.lightOffDelay;
    document.querySelector("#material-form-resin-burnInLiftDistance").value =
      materialToUpdate[0].settings.burnIn.liftDistance;
    document.querySelector("#material-form-resin-burnInLiftSpeed").value =
      materialToUpdate[0].settings.burnIn.liftSpeed;
    document.querySelector("#material-form-resin-lightOffDelay").value =
      materialToUpdate[0].settings.burnIn.lightOffDelay;
    document.querySelector("#material-form-resin-exposureTime").value =
      materialToUpdate[0].settings.burnIn.exposureTime;
    document.querySelector("#material-form-resin-liftDistance").value =
      materialToUpdate[0].settings.burnIn.liftDistance;
    document.querySelector("#material-form-resin-liftSpeed").value =
      materialToUpdate[0].settings.burnIn.liftSpeed;
    document.querySelector("#material-form-resin-retractSpeed").value =
      materialToUpdate[0].settings.retractionSpeed;
  }
  if (materialToUpdate[0].type === "fdm") {
  }
};

const makeMaterial = () => {
  let newMaterial = {};
  if (document.querySelector("#material-form-type").value === "resin") {
    newMaterial = {
      title: document.querySelector("#material-form-title").value,
      type: "resin",
      settings: {
        burnIn: {
          layerCount: document.querySelector(
            "#material-form-resin-burnInLayerCount"
          ).value,
          exposureTime: document.querySelector(
            "#material-form-resin-burnInExposureTime"
          ).value,
          transitionLayers: document.querySelector(
            "#material-form-resin-burnInTransitionLayerCount"
          ).value,
          lightOffDelay: document.querySelector(
            "#material-form-resin-burnInLightOffDelay"
          ).value,
          liftDistance: document.querySelector(
            "#material-form-resin-burnInLiftDistance"
          ).value,
          liftSpeed: document.querySelector(
            "#material-form-resin-burnInLiftSpeed"
          ).value,
        },
        exposureTime: document.querySelector(
          "#material-form-resin-exposureTime"
        ).value,
        lightOffDelay: document.querySelector(
          "#material-form-resin-lightOffDelay"
        ).value,
        liftDistance: document.querySelector(
          "#material-form-resin-liftDistance"
        ).value,
        liftSpeed: document.querySelector("#material-form-resin-liftSpeed")
          .value,
        retractionSpeed: document.querySelector(
          "#material-form-resin-retractSpeed"
        ).value,
      },
      storeLink: document.querySelector("#material-form-store").value,
      image: document.querySelector("#material-form-image").value,
      price: document.querySelector("#material-form-price").value,
      stock: document.querySelector("#material-form-stock").value,
    };

    const finishedMaterial = new Resin(newMaterial);
    finishedMaterial.save().then(() => {
      const message = new CustomEvent("materialFormSubmit");
      document.querySelector(".container").dispatchEvent(message);
    });
  }

  if (document.querySelector("#material-form-type").value === "fdm") {
    newMaterial = {
      title: document.querySelector("#material-form-title").value,
      type: "fdm",
      settings: {
        nozzleTemp: document.querySelector("#material-form-fdm-nozzleTemp")
          .value,
        bedTemp: document.querySelector(`#material-form-fdm-bedTemp`).value,
        retractionDistance: document.querySelector(
          `#material-form-fdm-retractionDistance`
        ).value,
        retractionSpeed: document.querySelector(
          `#material-form-fdm-retractionSpeed`
        ).value,
      },
      storeLink: document.querySelector("#material-form-store").value,
      image: document.querySelector("#material-form-image").value,
      price: document.querySelector("#material-form-price").value,
      stock: document.querySelector("#material-form-stock").value,
    };

    const finishedMaterial = new Fdm(newMaterial);
    finishedMaterial.save().then(() => {
      const message = new CustomEvent("materialFormSubmit");
      document.querySelector(".container").dispatchEvent(message);
    });
  }
};

const render = () => {
  const targetElement = document.querySelector(".material-form-container");

  targetElement.innerHTML = `
  <form>
    <h2 class="material-form-title">New Material:</h2>
    <input type="hidden" id="material-form-id">
    <div>
        <label for="material-form-title">Name of material:</label>
        <input type="text" placeholder="Name:" id="material-form-title">
    </div>
    <div>
    <label for="material-form-type">Type of material:</label>
        <select id="material-form-type">
          <option value="0">Please select an option:</option>
          <option value="resin">Resin</option>
          <option value="fdm">FDM plastic</option>
        </select>
    </div>
    <div id="material-form-settings">
        <p>Please select the type of material for more options</p>
    </div>
    <div>
        <label for="material-form-store">Link to store:</label>
        <input type="text" id="material-form-store">
    </div>
    <div>
        <label for="material-form-image">Image link:</label>
        <input type="text" id="material-form-image">
    </div>
    <div>
        <label for="material-form-price">Price per roll/bottle:</label>
        <input type="number" id="material-form-price">
    </div>
    <div>
        <label for="material-form-stock">Number in inventory:</label>
        <input type="number" id="material-form-stock">
    </div>
    <button id="material-form-submit">Submit</button>
  </form>`;
};

const settingSelector = () => {
  const targetElement = document.querySelector("#material-form-settings");

  if (document.querySelector("#material-form-type").value === "0") {
    return (targetElement.innerHTML = `<p>Please select the type of material for more options</p>`);
  }

  if (document.querySelector("#material-form-type").value === "resin") {
    return (targetElement.innerHTML = `
    <div>
        <label for="material-form-resin-burnInLayerCount">Number of burn-in layers:</label>
        <input type="number" id="material-form-resin-burnInLayerCount">
    </div>
    <div>
        <label for="material-form-resin-burnInExposureTime">Burn-in layer exposure time:</label>
        <input type="number" id="material-form-resin-burnInExposureTime">
    </div>
    <div>
        <label for="material-form-resin-burnInTransitionLayerCount">Burn-in transition layers:</label>
        <input type="number" id="material-form-resin-burnInTransitionLayerCount">
    </div>
    <div>
        <label for="material-form-resin-burnInLightOffDelay">Burn-in light off delay:</label>
        <input type="number" id="material-form-resin-burnInLightOffDelay">
    </div>
    <div>
        <label for="material-form-resin-burnInLiftDistance">Burn-in lift distance:</label>
        <input type="number" id="material-form-resin-burnInLiftDistance">
    </div>
    <div>
        <label for="material-form-resin-burnInLiftSpeed">Burn-in lift speed:</label>
        <input type="number" id="material-form-resin-burnInLiftSpeed">
    </div>
    <div>
        <label for="material-form-resin-lightOffDelay">Light off delay:</label>
        <input type="number" id="material-form-resin-lightOffDelay">
    </div>
    <div>
        <label for="material-form-resin-exposureTime">Exposure time:</label>
        <input type="number" id="material-form-resin-exposureTime">
    </div>
    <div>
        <label for="material-form-resin-liftDistance">Lift distance:</label>
        <input type="number" id="material-form-resin-liftDistance">
    </div>
    <div>
        <label for="material-form-resin-liftSpeed">Lift speed:</label>
        <input type="number" id="material-form-resin-liftSpeed">
    </div>
    <div>
        <label for="material-form-resin-retractSpeed">Retraction speed:</label>
        <input type="number" id="material-form-resin-retractSpeed">
    </div>
    `);
  }

  if (document.querySelector("#material-form-type").value === "fdm") {
    return (targetElement.innerHTML = `
    <div>
        <label for="material-form-fdm-nozzleTemp">Nozzle temperature:</label>
        <input type="number" id="material-form-fdm-nozzleTemp">
    </div>
    <div>
        <label for="material-form-fdm-bedTemp">Heated bed temperature:</label>
        <input type="number" id="material-form-fdm-bedTemp">
    </div>
    <div>
        <label for="material-form-fdm-retractionDistance">Retraction distance:</label>
        <input type="number" id="material-form-fdm-retractionDistance">
    </div>
    <div>
        <label for="material-form-fdm-retractionSpeed">Restraction speed:</label>
        <input type="number" id="material-form-fdm-retractionSpeed">
    </div>
    `);
  }
};
