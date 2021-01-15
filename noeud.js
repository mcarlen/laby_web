export class Noeud {
  constructor() {
    this.parent = null;
  }

  /*bool*/ isSameSet(/*Noeud*/ other) {
    if (other.getRepresentant() == this.getRepresentant()) {
      return true;
    }
    return false;
  }

  link(/*Noeud*/ other) {
    let representant = other.getRepresentant();
    let current = this;
    if (this.parent == null && other.parent == null) {
      this.parent = representant;
    } else if (this.parent == null && other.parent != null) {
      this.parent = representant;
    } else if (this.parent != null && other.parent == null) {
      other.parent = this.getRepresentant();
    } else {
      while (current.parent != null) {
        let tmp = current.parent;
        current.parent = representant;
        current = tmp;
      }
      current.parent = representant;
    }
  }

  /*Noeud*/ getRepresentant() {
    let representant = this;
    if (representant.parent == null) {
      return this;
    } else {
      while (representant.parent != null) {
        representant = representant.parent;
      }
    }
    let tmp = null;
    let current = this;
    while (current.parent != representant) {
      tmp = current.parent;
      current.parent = representant;
      current = tmp;
    }
    return representant;
  }
}
