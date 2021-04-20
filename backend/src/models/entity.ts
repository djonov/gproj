export class Entity {
  constructor(data) {
    if (data) {
      Object.keys(data).map((key) => {
        this[key] = data[key];
      });
    }
  }

  setMetadata() {
    if (!this["_id"]) {
      this["createDate"] = new Date();
    }
    this["changeDate"] = new Date();
  }
}
