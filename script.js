"use strict";

function Grid() {
  this.container = document.querySelector('.grid-container__sketch'); 
  this.pixels = this.container.querySelectorAll('div'); // try children

  this.pixelsListener = function (callback) {
    this.pixels.forEach(elem => elem.addEventListener('mouseover', callback));
  }

  this.resetcssText = function() {
    this.pixels.forEach(node => { node.style.cssText=""; node.classList.remove('grid-container__sketch-hover')}); 
  }

  this.update = function () {
    this.container = document.querySelector('.grid-container__sketch'); 
    this.pixels = this.container.querySelectorAll('div');
  }
} 
  
function Controls () {
  this.button = document.querySelector("input[name='submit-button']");
  this.mode = 'greyscale';
  this.modeNodes = document.querySelectorAll("input[name='mode']");
  this.sizeElem = document.querySelector("input[type='number']");
  this.size = this.sizeElem.value;
  this.res = document.querySelector("input[name='reset']");

  this.buttonListener = function(callback) {
    this.button.addEventListener('click', () => { this.size = this.sizeElem.value; callback() } );
  }
 
  this.modeListener = function(callback) {
    for(let elem of this.modeNodes)
      elem.addEventListener('click', () => { this.mode = elem.value; callback();});   
  }

  this.resListener = function(callback) {
    this.res.addEventListener('click', () => callback());
  }
}

function pixelDraw () {
  function randomColor() { 
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  }
    this.classList.toggle('grid-container__sketch-hover'); // 3d rotation

    if(ctrl.mode == 'greyscale') {
        if(this.style.opacity)
          this.style.opacity =`${+(this.style.opacity) + 0.1}` ;
        else
          this.style.opacity = '0.1';
    
        this.style.backgroundColor = `rgba(0,0,0, ${this.style.opacity})`;
    } 
    else
        this.style.backgroundColor = `${randomColor()}`;
    
    this.style.border = '0px'; // somehow border: 0px; slows grid with 30+ pixels down (dev mode issue)  
}

function gridInit () {
  let size = ctrl.size;
  grid.pixels.forEach(node => node.remove());

  //consider css variables
  grid.container.style.cssText =`grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr);`; 
  
  for(let squareSize = size*size, node; squareSize > 0; squareSize--) {
    node = document.createElement('div');
    grid.container.appendChild(node);
  }
  
  grid.update();
  grid.pixelsListener(pixelDraw);
}




 let ctrl = new Controls();
/* for (let key in ctrl) {
  if (typeof ctrl[key] == 'function') {
    ctrl[key] = ctrl[key].bind(user);
  }
} */
let grid = new Grid();
grid.resetcssText = grid.resetcssText.bind(grid);

gridInit(); 
ctrl.buttonListener(gridInit);
ctrl.modeListener(grid.resetcssText);
ctrl.resListener(grid.resetcssText);