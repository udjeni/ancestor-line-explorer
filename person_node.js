import { Person } from "./person.js";

export class PersonNode {
  constructor(person) {
    this.id = person.getId();
    this.wtId = person.getWtId();
    this.parents = [];
    this.displayName = person.getDisplayName();
  }

  getD3Children() {
    return this.parents;
  }

  getDisplayName() {
    return this.displayName;
  }

  getId() {
    return this.id;
  }

  getParents() {
    return this.parents;
  }

  getParent(id) {
    const p = this.parents.find((n) => n.id == id);
    return p;
  }

  hasParent(id) {
    return this.parents.map((n) => n.id).includes(id);
  }

  addParent(node) {
    if (!this.hasParent(node.id)) {
      this.parents.push(node);
    }
  }
}
