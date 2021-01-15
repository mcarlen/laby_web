import {Noeud} from './noeud.js'
import {Mur, Segment, Vector, displayError} from './tools.js'

export class Labyrinthe {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.wallCount = width * (height - 1) + (width - 1) * height;
    this.walls = new Array(this.wallCount);
    this.nodeCount = width * height;
    this.noeuds = new Array(this.nodeCount);
  }

  generate() {
    this.initWalls();
    this.shuffle(100);
    this.openWalls();
  }

  initWalls() {
    let tabPos = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width - 1; x++) {
        let from = new Vector(x + 1, y);
        let to = new Vector(x + 1, y + 1);
        let position = y * this.width + x;
        this.walls[tabPos] = new Mur(position, position + 1, from, to);
        tabPos++;
      }
    }

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height - 1; y++) {
        let from = new Vector(x, y + 1);
        let to = new Vector(x + 1, y + 1);
        let position = x + y * this.width;
        this.walls[tabPos] = new Mur(position, position + this.width, from, to);
        tabPos++;
      }
    }
  }

  shuffle(iterations) {
    if (this.wallCount < 2) {
      return;
    }

    for (let gu = 0; gu < iterations; gu++) {
      for (let place = 0; place < this.wallCount - 1; place++) {
        let hasard = parseInt(Math.random() * this.wallCount);
        while (hasard == place) {
          hasard = parseInt(Math.random() * this.wallCount);
        }
        let tmp = this.walls[place];
        this.walls[place] = this.walls[hasard];
        this.walls[hasard] = tmp;
      }
    }
  }

  openWalls() {
    for (let t = 0; t < this.nodeCount; t++) {
      this.noeuds[t] = new Noeud();
    }
    for (let g = 0; g < this.wallCount; g++) {
      if (this.noeuds[this.walls[g].cell2].isSameSet(
              this.noeuds[this.walls[g].cell1]) == false) {
        this.noeuds[this.walls[g].cell2].link(this.noeuds[this.walls[g].cell1]);
        this.walls[g].open = true;
      }
    }
  }

  dfs(/*int*/ cellStart, /*int*/ cellEnd) {
    let neighbors = new Array(this.nodeCount);
    let visited = new Array(this.nodeCount);
    let lastNode = new Array(this.nodeCount);
    for (let i = 0; i < this.nodeCount; ++i) {
      neighbors[i] = new Array();
      visited[i] = false;
      lastNode[i] = -1;
    }
    for (let i = 0; i < this.wallCount; ++i) {
      let wall = this.walls[i];
      if (wall.open == true) {
        neighbors[wall.cell1].push(wall.cell2);
        neighbors[wall.cell2].push(wall.cell1);
      }
    }
    let stack = new Array();
    stack.push(cellStart);
    visited[cellStart] = true;
    while (stack.length > 0) {
      let current = stack.pop();
      if (current == cellEnd) {
        let cnt = 0;
        let n = cellEnd;
        let result = new Array();
        while (n != cellStart) {
          result.push(n);
          n = lastNode[n];
          cnt++;
          if (cnt > this.nodeCount) {
            return [];
          }
        }
        result.push(cellStart);
        return result;
      }
      let cells = neighbors[current];
      for (let j = 0; j < cells.length; ++j) {
        let cell = cells[j];
        if (visited[cell] == false) {
          stack.push(cell);
          visited[cell] = true;
          lastNode[cell] = current;
        }
      }
    }
    console.log('Should not happen.');
    return [];
  }

  solve(dessin) {
    let solutionPath = this.dfs(0, this.nodeCount - 1);
    if (solutionPath.length < 2) {
      return false;
    }

    let cell = solutionPath[0];
    let fromX = cell % this.width;
    let fromY = parseInt(cell / this.width);
    for (let i = 1; i < solutionPath.length; ++i) {
      cell = solutionPath[i];
      let toX = cell % this.width;
      let toY = parseInt(cell / this.width);

      function makeSegment(x0, y0, x1, y1) {
        return new Segment(
            new Vector(x0 + .5, y0 + .5), new Vector(x1 + .5, y1 + .5));
      }
      dessin.draw(makeSegment(fromX, fromY, toX, toY), 'lightblue', 5);
      fromX = toX;
      fromY = toY;
    }
    return true;
  }

  draw(dessin) {
    this.drawStartEnd(dessin);
    this.drawFrame(dessin);
    this.drawWalls(dessin);
  }

  drawStartEnd(dessin) {
    dessin.drawCell(0, 0, 'rgb(255, 158, 158)');
    dessin.drawCell(this.width - 1, this.height - 1, 'rgb(173, 255, 160)')
  }

  drawFrame(dessin) {
    function makeSegment(x0, y0, x1, y1) {
      return new Segment(new Vector(x0, y0), new Vector(x1, y1));
    }
    // Top.
    dessin.draw(makeSegment(0, 1, 0, this.height));
    dessin.draw(makeSegment(0, this.height, this.width, this.height));

    dessin.draw(makeSegment(this.width, this.height - 1, this.width, 0));
    dessin.draw(makeSegment(this.width, 0, 0, 0));
  }

  drawWalls(dessin) {
    for (let count = 0; count < this.wallCount; count++) {
      if (this.walls[count].open == false) {
        this.walls[count].draw(dessin);
      }
    }
  }
}
