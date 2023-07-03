class Material {
  constructor(material) {
    this.title = material.title;
    this.type = material.type;
    this.settings = material.settings;
    this.storeLink = material.storeLink;
    this.price = material.price;
    this.stock = material.stock;
    this.id = material.id;
  }

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

  render() {
    return `
    <h2>Test ${this.title}</h2>
    `;
  }
}

export class Fdm extends Material {
  constructor(material) {
    super(material);
  }

  render() {
    return `
    <h2>Test ${this.title}</h2>
    `;
  }
}
