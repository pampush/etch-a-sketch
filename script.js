// bad code 
"use strict";

function Grid() {
  this.container = document.querySelector('.grid-container__sketch'); 
  this.pixels = this.container.querySelectorAll('div'); // try children

  this.resetcssText = function() {
    this.pixels.forEach(node => { node.style.cssText=""; node.classList.remove('grid-container__sketch-hover')}); 
  }

  this.update = function () {
    this.container = document.querySelector('.grid-container__sketch'); 
    this.pixels = this.container.querySelectorAll('div');
  }

  this.gridInit = function (method, size, mode) { 
    this.pixels.forEach(node => node.remove());

    //consider css variables
    this.container.style.cssText =`grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr);`; 
    
    for(let squareSize = size*size, node; squareSize > 0; squareSize--) {
      node = document.createElement('div');
      this.container.appendChild(node);
    }
    
    this.update();
    let func = method(mode); // to keep elem context below
    this.pixels.forEach(elem => elem.addEventListener('mouseover', func));
  }
  
  this.pixelDraw = function (mode) {
    function randomColor() { 
      return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    }
    return function() { 
      this.classList.toggle('grid-container__sketch-hover'); // 3d rotation
      if(mode == 'greyscale') {
          if(this.style.opacity)
            this.style.opacity =`${+(this.style.opacity) + 0.1}` ;
          else
            this.style.opacity = '0.1';
      
          this.style.backgroundColor = `rgba(0, 0, 0, ${this.style.opacity})`;
      } 
      else
          this.style.backgroundColor = `${randomColor()}`;
      
      this.style.border = '0px'; // somehow border: 0px; slows grid with 30+ pixels down (dev mode issue)
    }
  }

  this.update = this.update.bind(this);  
  this.resetcssText = this.resetcssText.bind(this);
  this.gridInit = this.gridInit.bind(this, this.pixelDraw);
} 
  
function Controls () {
  this.button = document.querySelector("input[name='submit-button']");
  this.mode = 'greyscale';
  this.modeNodes = document.querySelectorAll("input[name='mode']");
  this.sizeElem = document.querySelector("input[type='number']");
  this.size = this.sizeElem.value;
  this.res = document.querySelector("input[name='reset']");

  this.buttonListener = function(initFunc) {
    this.button.addEventListener('click', () => { this.size = this.sizeElem.value; initFunc(this.size, this.mode);});
  }
 
  this.modeListener = function() {
    let myEv = new Event('click');
    for(let elem of this.modeNodes)
      elem.addEventListener('click', () => { this.mode = elem.value; this.button.dispatchEvent(myEv)});   
  }

  this.resListener = function(resFunc) {
    this.res.addEventListener('click',resFunc);
  }
}

let ctrl = new Controls();
let grid = new Grid();

grid.gridInit(ctrl.size, ctrl.mode);
ctrl.buttonListener(grid.gridInit); // 1st method for grid rendering, 2nd for cells modification 
ctrl.modeListener();
ctrl.resListener(grid.resetcssText);