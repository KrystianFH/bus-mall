'use strict';

// Global Variables
var productArray = [];
var totalClicks = 0;

// Function Definitions
function Product(imageName, src){
  this.liveClicks = 0;
  this.imageName = imageName;
  this.imageSrc = src;

  productArray.push(this);
}

Product.prototype.renderProductAsHtml = function () {
  var target = document.getElementById('product-list');
  var productHomeLi = document.createElement('li');

  var productImage = document.createElement('img');
  productImage.src = this.imageSrc;
  productImage.alt = this.imageName;
  productHomeLi.appendChild(productImage);

  var productTextP = document.createElement('p');
  productTextP.textContent = this.imageName;
  productHomeLi.appendChild(productTextP);

  target.appendChild(productHomeLi);
};


// This function tells the js what to do upon a click event
function handleClickOnImage(event) {
  console.log(event.target);

  if(event.target.tagName === 'IMG') {

    totalClicks++;

    for (var productIndex = 0; productIndex < productArray.length; productIndex++) {
      if (productArray[productIndex].imageSrc === event.target.getAttribute('src')) {
        console.log ('they match');
        productArray[productIndex].liveClicks++;
      }
    }
    displayProducts ();

    if(totalClicks === 25){
      var productList = document.getElementById('product-list');
      productList.innerHTML = '';

      listOfProducts.removeEventListener('click', handleClickOnImage);
    }

  } else {
    console.log('Please click an image');
  }
}
// end event click function

function displayProducts(){
  var index1 = Math.floor(Math.random() * productArray.length);
  var index2 = Math.floor(Math.random() * productArray.length);
  var index3 = Math.floor(Math.random() * productArray.length);
  var index4 = Math.floor(Math.random() * productArray.length);
  var index5 = Math.floor(Math.random() * productArray.length);
  var index6 = Math.floor(Math.random() * productArray.length);

  var newProduct1 = productArray[index1];
  var newProduct2 = productArray[index2];
  var newProduct3 = productArray[index3];
  var newProduct4 = productArray[index4];
  var newProduct5 = productArray[index5];
  var newProduct6 = productArray[index6];

  var productList = document.getElementById('product-list');
  productList.innerHTML = '';
  
  newProduct1.renderProductAsHtml();
  newProduct2.renderProductAsHtml();
  newProduct3.renderProductAsHtml();
  newProduct4.renderProductAsHtml();
  newProduct5.renderProductAsHtml();
  newProduct6.renderProductAsHtml();
}

var listOfProducts = document.getElementById('product-list');
listOfProducts.addEventListener('click', handleClickOnImage);

new Product('Toeless Rainboots', '/img/boots.jpg');
new Product('Breakfast Maker', '/img/breakfast.jpg');
new Product('Cthulu', '/img/cthulhu.jpg');
new Product('Can of Dragon Meat', '/img/dragon.jpg');
new Product('Bubblegum-flavored Meatballs', '/img/bubblegum.jpg');
new Product('Canned Unicorn Meat', '/img/unicorn.jpg');

