const { getAllFoods } = require('../../server/database');

$(document).ready(function(){
  loadFoods();
})

const foodsData = getAllFoods();

const createFoodElement = function(foodsData) {

  const $food = $(` <article class="food-container">
           <img class="food-picture" src="${foodsData.food_picture_url}"/>
           <p class="food-name">${foodsData.title}</p>
           <p class="food-price">${foodsData.price_cents}</p>
            <button type="button" class="add-menu-btn"> + </button>
        </article>`);
        return $food;
};

const renderFoods = function (foods) {
  let $element;
  const $container = $('#menu-section');
  for (const food of foods) {
    $element = createFoodElement(food);
    $container.append($element);
  }
}

const loadFoods = function () {
  $.ajax('/order', { method: 'GET' })
  .then(renderFoods(foodsData));
};

const addFoodToList = function (foodsData) {
  const $foodItem = $(` <ol>
            <li>Item:${foodsData.title}</li>
            <li>Price:${foodsData.price_cents} Qty:</li>
          </ol>`);
          return $foodItem;
}

const renderFoodToList = function () {
  const $container = $('#order-list');
  $(".add-menu-btn").on("click", function (){
    $container.append(addFoodToList());
    })
}



// function for query to edit menu

// function to delete query item

// function to change unconfirmed order to order

// function for listing out the menu names on the menu editor

// function for calculating total cost

// function for radio boxes- order-ready or order-not ready
