import {run, solve, simulateError} from './laby.js';

document.addEventListener('DOMContentLoaded', function() {
  let canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth - 40;
  canvas.height = window.innerHeight - 40;
  if (canvas.width < 100) {
    canvas.width = 100;
  }
  if (canvas.hight < 100) {
    canvas.height = 100;
  }
  run();
  document.querySelector('#run').addEventListener('click', run, false);
  document.querySelector('#solve').addEventListener('click', solve, false);
  document.querySelector('#simulateError').addEventListener('click', simulateError, false);
});
