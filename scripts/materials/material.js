class Material {
  constructor(material) {
    this.title = material.title;
    this.type = material.type;
    this.settings = material.settings;
    this.storeLink = material.storeLink;
    this.image = material.image;
    this.price = material.price;
    this.stock = material.stock;
    this.id = material.id;
  }

  // Render html for list

  render() {
    return `
    <div class="material-card" id="${this.id}">
      <h2 class="material-card-title">${this.title}</h2>
      <image class="material-card-image" src="${this.image}">
      <p class="material-card-inventory">Inventory: ${this.stock}</p>
      <p class="material-card-price">Price: ${this.price}</p>
    </div>
    `;
  }

  // Render html for detail

  renderDetail() {
    return `
    <button id="modal-close-button">X</button>
    <h2 class="material-card-title">${this.title}</h2>
    <image class="material-card-image" src="${this.image}">
    ${this.renderSettings()}
    <p class="material-card-inventory">Inventory: ${this.stock}</p>
    <p class="material-card-price">Price: ${this.price}</p>
    <button class="modal-update-button" id="update-${this.id}">Update</button>
    <button class="modal-delete-button" id="delete-${this.id}">Delete</button>
      `;
  }

  // Routes to database

  save() {
    return fetch(`http://localhost:8088/materials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this),
    });
  }

  update(updatedMaterial) {
    return fetch(`http://localhost:8088/materials/${this.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMaterial),
    });
  }

  delete() {
    return fetch(`http://localhost:8088/materials/${this.id}`, {
      method: "DELETE",
    });
  }
}

export class Resin extends Material {
  constructor(material) {
    super(material);
  }

  // Render html for specific settings

  renderSettings() {
    return `
    <p>Number of Burn-in layers: ${this.settings.burnIn.layerCount}</p>
    <p>Burn-in layer exposure time: ${this.settings.burnIn.exposureTime}</p>
    <p>Number of transition layers: ${this.settings.burnIn.transitionLayers}</p>
    <p>Burn-in light off delay: ${this.settings.burnIn.lightOffDelay}</p>
    <p>Burn-in layer lift distance: ${this.settings.burnIn.liftDistance}</p>
    <p>Burn-in layer lift speed: ${this.settings.burnIn.liftSpeed}</p>
    <p>Layer exposure time: ${this.settings.exposureTime}</p>
    <p>Layer light off delay: ${this.settings.lightOffDelay}</p>
    <p>Layer lift distance: ${this.settings.liftDistance}</p>
    <p>Layer lift speed: ${this.settings.liftSpeed}</p>
    <p>Retraction speed: ${this.settings.retractionSpeed}</p>
    `;
  }
}

export class Fdm extends Material {
  constructor(material) {
    super(material);
  }

  // Render html for specific settings

  renderSettings() {
    return `
    <p>Nozzle temperature (C): ${this.settings.nozzleTemp}</p>
    <p>Bed temperature (C): ${this.settings.bedTemp}</p>
    <p>Retraction distance: ${this.settings.retractionDistance}</p>
    <p>Retraction speed: ${this.settings.retractionSpeed}</p>
    `;
  }
}
