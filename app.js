'use strict';

// =====Global Variables====
var productArray = [];
var totalClicks = 0;
var productIndexesCurrentlyDisplayed = [];

// =====Function Definitions====
function Product(imageName, src){
  this.liveClicks = 0;
  this.imageName = imageName;
  this.imageSrc = src;
  this.productDisplayCounter = 0;

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
    // console.log(totalClicks);

    for (var productIndex = 0; productIndex < productArray.length; productIndex++) {
      if (productArray[productIndex].imageSrc === event.target.getAttribute('src')) {
        console.log ('they match');
        productArray[productIndex].liveClicks++;
      }
    }
    displayProducts();

    if(totalClicks === 10){
      var listOfProducts = document.getElementById('product-list');
      listOfProducts.innerHTML = '';

      listOfProducts.removeEventListener('click', handleClickOnImage);
      renderTotalsAsList();
      displayProducts();
      makeMyChart();
    }

  } else {
    console.log('Please click an image');
  }
}
// end event click function

// display Products function
function displayProducts(){

  var index1 = Math.floor(Math.random() * productArray.length);

  while(index1 === productIndexesCurrentlyDisplayed[0] || index1 === productIndexesCurrentlyDisplayed[1] || index1 === productIndexesCurrentlyDisplayed[2]){
    index1 = Math.floor(Math.random() * productArray.length);
  }

  var index2 = Math.floor(Math.random() * productArray.length);

  while(index1 === index2 || index2 === productIndexesCurrentlyDisplayed[0] || index2 === productIndexesCurrentlyDisplayed[1] || index2 === productIndexesCurrentlyDisplayed[2]){
    index2 = Math.floor(Math.random() * productArray.length);
  }

  var index3 = Math.floor(Math.random() * productArray.length);

  while(index1 === index3 || index2 === index3 || index3 === productIndexesCurrentlyDisplayed[0] || index3 === productIndexesCurrentlyDisplayed[1] || index3 === productIndexesCurrentlyDisplayed[2]){
    index3 = Math.floor(Math.random() * productArray.length);
  }

  var newProduct1 = productArray[index1];
  var newProduct2 = productArray[index2];
  var newProduct3 = productArray[index3];

  var productList = document.getElementById('product-list');
  productList.innerHTML = '';
  newProduct1.renderProductAsHtml();
  newProduct2.renderProductAsHtml();
  newProduct3.renderProductAsHtml();

  newProduct1.productDisplayCounter++;
  newProduct2.productDisplayCounter++;
  newProduct3.productDisplayCounter++;

  productIndexesCurrentlyDisplayed = [index1, index2, index3];
}

function makeMyChart(){
  var labelArray = [];

  for(var productIndex = 0; productIndex < productArray.length; productIndex++){
    labelArray.push(productArray[productIndex].imageName);
  }

  var productDataArray = [];

  for(var i = 0; i < productArray.length; i++){
    productDataArray.push(productArray[i].liveClicks);
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelArray,
      datasets: [{
        label: 'Votes per Product',
        data: productDataArray,
        backgroundColor: [
          'rgba(179, 255, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(179, 255, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}



// display products complete

// rendering totals start
function renderTotalsAsList(){
  var list = document.getElementById('product-vote-totals');
  list.innerHTML = '';

  for(var i = 0; i < productArray.length; i++){
    var listItem = document.createElement('li');
    listItem.textContent = productArray[i].imageName + ': ' + productArray[i].liveClicks + ' clicks.';
    list.appendChild(listItem);
  }
}
// rendering totals complete

var listOfProducts = document.getElementById('product-list');
listOfProducts.addEventListener('click', handleClickOnImage);

new Product('Toeless Rainboots', '/img/boots.jpg');
new Product('Breakfast Maker', '/img/breakfast.jpg');
new Product('Cthulhu', '/img/cthulhu.jpg');
new Product('Can of Dragon Meat', '/img/dragon.jpg');
new Product('Bubblegum-flavored Meatballs', '/img/bubblegum.jpg');
new Product('Canned Unicorn Meat', '/img/unicorn.jpg');

displayProducts();

