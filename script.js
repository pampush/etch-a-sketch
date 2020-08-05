"use strict";
function Grid() {
  this.container = document.querySelector('.grid-container__sketch');
  this.pixels = this.container.querySelectorAll('div'); // try children
  this.mode = 'greyscale';
  this.size = 3;
  this.method = 'greyscale';

  this.resetcssText = function() {
    this.pixels.forEach(node => { node.style.cssText=''; node.dataset.opacity='0'; node.classList.remove('grid-container__sketch-hover')}); 
  }

  this.update = function () {
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
  }  

  this.colorful = function(target) {
    function randomColor() { 
      return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'); //or random(255)+random(255)+random(255);
    }
    target.classList.toggle('grid-container__sketch-hover'); // 3d rotation
    target.style.backgroundColor = `${randomColor()}`;   
    target.style.border = '0px';
  };

  this.greyscale = function(target) {
    target.classList.toggle('grid-container__sketch-hover');
    if(target.dataset.opacity)
      target.dataset.opacity =`${+(target.dataset.opacity) + 0.1}` ;
    else
      target.dataset.opacity = '0.1';
    target.style.border = '0px';
    target.style.backgroundColor = `rgba(0, 0, 0, ${target.dataset.opacity})`;
  };

  this.onMouseOver = function(e) {
    if(!this[this.method] || e.target.classList == 'grid-container__sketch') 
      return; 
    this[this.method](e.target);
  };

  this.container.addEventListener('mouseover', this.onMouseOver.bind(this)); 
  this.update = this.update.bind(this);  
  this.resetcssText = this.resetcssText.bind(this);
  this.gridInit = this.gridInit.bind(this);
} 

const button = document.querySelector("input[name='submit-button']"),
      modeNodes = document.querySelectorAll("input[name='mode']"),
      sizeElem = document.querySelector("input[type='number']"),
      res = document.querySelector("input[name='reset']"),
      switchModeNode = document.querySelector(".switch-mode"),
      grid = new Grid(); 

button.addEventListener('click', () => {  grid.size = sizeElem.value; grid.gridInit();});

switchModeNode.addEventListener('click', (e) => { 
  if(e.target && e.target.tagName == 'INPUT') 
    grid.method = e.target.value; 
  grid.resetcssText()})

res.addEventListener('click', grid.resetcssText);
grid.gridInit();
