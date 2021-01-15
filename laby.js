import {Labyrinthe} from './labyrinthe.js';
import {displayError, displayStatus} from './tools.js';

class Dessin {
  constructor(canvas, width, height, margin) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.margin = margin;

    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = 'black';
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    let scaleX = (canvas.width - 2 * margin) / width;
    let scaleY = (canvas.height - 2 * margin) / height;
    this.scale = (scaleX < scaleY) ? scaleX : scaleY;
  }

  draw(segment) {
    this.draw(segment, 'black', 3);
  }

  draw(segment, color, lineWidth) {
    this.ctx.beginPath();
    this.ctx.moveTo(
        this.scale * segment.a.x + this.margin,
        this.scale * segment.a.y + this.margin);
    this.ctx.lineTo(
        this.scale * segment.b.x + this.margin,
        this.scale * segment.b.y + this.margin);
    this.ctx.closePath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  drawCell(x, y, color) {
    this.ctx.beginPath();
    this.ctx.rect(
        this.scale * (x + .1) + this.margin,
        this.scale * (y + .1) + this.margin, .8 * this.scale, .8 * this.scale);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
}

var laby = null;
var dessin = null;
function run() {
  if (laby != null) {
    laby = null;
    dessin = null;
  }
  let canvas = document.querySelector('canvas');
  if (!canvas.getContext) {
    displayError('No canvas context.');
    return;
  }

  const width = parseInt(document.querySelector('#width').value);
  const height = parseInt(document.querySelector('#height').value);

  laby = new Labyrinthe(width, height);
  laby.generate();

  dessin = new Dessin(canvas, width, height, 10);
  laby.draw(dessin);
  displayStatus('Laby generation done!');
}

function solve() {
  if (laby == null || dessin == null) {
    return;
  }
  if (laby.solve(dessin)) {
    displayStatus('Solved!');
  } else {
    displayError('No path found!');
  }
}

function simulateError() {
  displayError('This is just a drill.');
}

export {run, solve, simulateError}
