// bad code 
"use strict";
function Grid() {
  this.container = document.querySelector('.grid-container__sketch'); 
  this.pixels = this.container.querySelectorAll('div'); // try children
  this.mode = 'greyscale';
  this.size = 3;
  this.method = null;

  this.resetcssText = function() {
    this.pixels.forEach(node => { node.style.cssText=""; node.classList.remove('grid-container__sketch-hover')}); 
  }

  this.update = function () {
    this.container = document.querySelector('.grid-container__sketch'); 
    this.container.removeEventListener('mouseover', (e) => { let target = e.target; method(mode, target);});
    this.pixels = this.container.querySelectorAll('div');
  }

  this.gridInit = function () {
    this.pixels.forEach(node => node.remove());

    //consider css variables
    this.container.style.cssText =`grid-template-columns: repeat(${this.size}, 1fr); grid-template-rows: repeat(${this.size}, 1fr);`; 
    
    for(let squareSize = this.size*this.size, node; squareSize > 0; squareSize--) {
      node = document.createElement('div');
      this.container.appendChild(node);
    }
    
    this.update();
    //this.pixels.forEach(elem => elem.addEventListener('mouseover', method(mode)));
    this.container.addEventListener('mouseover', (e) => { let target = e.target; if(!this.method) return; this.method(target);})
  }
  
  
 /*  this.pixelDraw = function (mode) {
    function randomColor() { 
      return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    }
    return function() { 
      this.classList.toggle('grid-container__sketch-hover'); // 3d rotation
      if(mode == 'greyscale') {
          if(this.dataset.opacity)
            this.dataset.opacity =`${+(this.dataset.opacity) + 0.1}` ;
          else
            this.dataset.opacity = '0.1';
      
          this.style.backgroundColor = `rgba(0, 0, 0, ${this.dataset.opacity})`;
      } 
      else
          this.style.backgroundColor = `${randomColor()}`;
      
      this.style.border = '0px'; // somehow border: 0px; slows grid with 30+ pixels down (dev mode issue)
    }
  } */
 
  this.update = this.update.bind(this);  
  this.resetcssText = this.resetcssText.bind(this);
  this.gridInit = this.gridInit.bind(this);
} 
  
const colorfulDraw = function (target) {
  function randomColor() { 
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  }
    //target.classList.toggle('grid-container__sketch-hover'); // 3d rotation
  target.style.backgroundColor = `${randomColor()}`;   
  target.style.border = '0px'; // somehow border: 0px; slows grid with 30+ pixels down (dev mode issue)   
}

const greyscaleDraw = function(target) { 
  if(target.dataset.opacity)
    target.dataset.opacity =`${+(target.dataset.opacity) + 0.1}` ;
  else
    target.dataset.opacity = '0.1';

  target.style.backgroundColor = `rgba(0, 0, 0, ${target.dataset.opacity})`;
}

  const button = document.querySelector("input[name='submit-button']"),
        modeNodes = document.querySelectorAll("input[name='mode']"),
        sizeElem = document.querySelector("input[type='number']"),
        res = document.querySelector("input[name='reset']"),
        colorfulNode = document.querySelector("input[value='colorful']"),
        greyscaleNode = document.querySelector("input[value='greyscale']"),
        grid = new Grid(); 
  
  button.addEventListener('click', () => {  grid.size = sizeElem.value; grid.gridInit(pixelDraw);});
  
  colorfulNode.addEventListener('click', () => { grid.mode = 'colorful'; grid.resetcssText(); grid.method = colorfulDraw});   
  greyscaleNode.addEventListener('click', () => { grid.mode = 'greyscale'; grid.resetcssText(); grid.method = greyscaleDraw}); 
  res.addEventListener('click', () => grid.resetcssText);
  grid.method = colorfulDraw;
  grid.gridInit();