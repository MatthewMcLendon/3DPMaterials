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
    <div class="material-card">
      <h2 class="material-card-title">${this.title}</h2>
      <image class="material-card-image" src="${this.image}">
      <p class="material-card-inventory">Inventory: ${this.stock}</p>
      <p class="material-card-price">Price: ${this.price}</p>
    </div>
    `;
  }

  // Render html for detail page

  renderDetail() {}

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
    <h2>Test ${this.title}</h2>
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
    <h2>Test ${this.title}</h2>
    `;
  }
}
