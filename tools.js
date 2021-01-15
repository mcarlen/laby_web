export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Segment {
  constructor(/*Vector*/ a, /*Vector*/ b) {
    this.a = a;
    this.b = b;
  }
}

export class Mur {
  constructor(/*int*/ cell1, /*int*/ cell2, /*Vector*/ from, /*Vector*/ to) {
    this.cell1 = cell1;
    this.cell2 = cell2;
    this.open = false;
    this.segment = new Segment(from, to);
  }

  draw(dessin) {
    dessin.draw(this.segment);
  }
}

function display(message, addClass, removeClass) {
   let error = document.querySelector('#error');
  error.innerText = message;
  error.classList.remove(removeClass);
  error.classList.add(addClass);
}

export function displayError(message) {
  display(message, 'error', 'ok');
}

export function displayStatus(message) {
  display(message, 'ok', 'error');
}
