// bad code 
"use strict";

function Grid() {
  this.container = document.querySelector('.grid-container__sketch'); 
  this.pixels = this.container.querySelectorAll('div'); // try children

   /* this.pixelsListener = function (callback) {
    this.pixels.forEach(elem => elem.addEventListener('mouseover', callback));
  }  */

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
      this.pixels.forEach(elem => elem.addEventListener('mouseover', () => method(mode) ));
  }
  
  
  this.pixelDraw = function (mode) {
    function randomColor() { 
      return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    }
      //this.classList.toggle('grid-container__sketch-hover'); // 3d rotation
      if(mode == 'greyscale') {
          if(event.target.style.opacity)
            event.target.style.opacity =`${+(event.target.style.opacity) + 0.1}` ;
          else
            event.target.style.opacity = '0.1';
      
          event.target.style.backgroundColor = `rgba(0, 0, 0, ${event.target.style.opacity})`;
      } 
      else
          event.target.style.backgroundColor = `${randomColor()}`;
      
      event.target.style.border = '0px'; // somehow border: 0px; slows grid with 30+ pixels down (dev mode issue)
  }

  this.update = this.update.bind(this);  
  this.resetcssText = this.resetcssText.bind(this);
  this.pixelDraw = this.pixelDraw.bind(this);
  this.gridInit = this.gridInit.bind(this, this.pixelDraw);
} 
  
function Controls () {
  this.button = document.querySelector("input[name='submit-button']");
  this.mode = 'greyscale';
  this.modeNodes = document.querySelectorAll("input[name='mode']");
  this.sizeElem = document.querySelector("input[type='number']");
  this.size = this.sizeElem.value;
  this.res = document.querySelector("input[name='reset']");

  this.buttonListener = function(callback) {
    this.button.addEventListener('click', () => { this.size = this.sizeElem.value;   callback(this.size, this.mode);});
  }
 
  this.modeListener = function() {
    let myEv = new Event('click');

    for(let elem of this.modeNodes)
      elem.addEventListener('click', () => { this.mode = elem.value; this.button.dispatchEvent(myEv)});   
  }

  this.resListener = function(callback) {
    this.res.addEventListener('click', () => callback());
  }
}

let ctrl = new Controls();
/* for (let key in ctrl) {
  if (typeof ctrl[key] == 'function') {
    ctrl[key] = ctrl[key].bind(user);
  }
} */
let grid = new Grid();

ctrl.buttonListener(grid.gridInit); // 1st method for grid rendering, 2nd for cells modification 
ctrl.modeListener();
ctrl.resListener(grid.resetcssText);