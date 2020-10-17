$(document).ready(function(){
  loadFoods();
})

const createFoodElement = function(foodData) {
  const $food = $(` <article class="food-container">
           <img class="food-picture" src="${foods.food_picture_url}"/>
           <p class="food-name">${foods.title}</p>
           <p class="food-price">${foods.price_cents}</p>
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
  .then(function(data) {
    renderFoods(data);
  });
};
