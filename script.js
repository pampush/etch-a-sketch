"use strict"; 

/**
 *  gridInit removes then creates new grid
 */
function gridInit () {
  let gridSize = document.querySelector("input[type='number']");
  let size = gridSize.value; // to do: validator
  let container = document.querySelector('.grid-container__sketch');
  let pixels = container.querySelectorAll('div'); // childNodes returns text nodes
  pixels.forEach((node) => container.removeChild(node));

  //consider css variables
  container.style.cssText =`grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr);`; 
  let squareSize = size * size
  while (squareSize--) {
    let node = document.createElement('div');
    container.appendChild(node);
  }
  pixels = container.querySelectorAll('div'); 
  pixels.forEach(elem => elem.addEventListener('mouseover', pixelDraw)); 
}

/**
 * removes all pixel's styles
 */
function resetcssText() {
  let container = document.querySelector('.grid-container__sketch');
  let pixels = container.querySelectorAll('div'); // childNodes returns text nodes
  pixels.forEach((node) => { node.style.cssText=""; node.classList.remove('grid-container__sketch-hover')}); 
}

/**
 * manipulate with pixel's styles to switch background
 * @function randomColor - generates random hex color code   
 */
function pixelDraw() {
  function randomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  }

  this.classList.toggle('grid-container__sketch-hover'); // 3d rotation

  if(badvarMode == 'greyscale') {
    if(this.style.opacity)
      this.style.opacity =`${+(this.style.opacity) + 0.1}` ;
    else
      this.style.opacity = '0.1';
    this.style.backgroundColor = `rgba(0,0,0, ${this.style.opacity})`;
  } 
  else
  //this.style.border = '0px'; // somehow border: 0px; slows grid with 30+ pixels down   
    this.style.backgroundColor = `${randomColor()}`; 
}

let container = document.querySelector('.grid-container__sketch');
let pixels = container.querySelectorAll('div'); // childNodes returns text nodes
let button = document.querySelector("input[name='submit-button']"); // multiple attributes??

let mode = document.querySelectorAll("input[name='mode']");
let badvarMode ='';
mode.forEach(elem => elem.addEventListener('click', function () { resetcssText(); badvarMode = this.value}))

button.addEventListener('click', gridInit);
pixels.forEach(elem => elem.addEventListener('mouseover', pixelDraw));

let res = document.querySelector("input[name='reset']");
res.addEventListener('click', resetcssText);


/*
wrong approach: creates multiple events and lexical environments on same element

gridSize.addEventListener('change', () => button.addEventListener('click', gridInit(event.target.value))); 
*/


/* to do- object with html elems state 
let grid = {
  container:
  pixels 
  ownAppendChild()
  deleteChild()

}
*/