
$(document).ready(function(){
 appendFoodtoList();
})

// const foodsData = getAllFoods();
// console.log(foodsData);

// const createFoodElement = function(foodsData) {

//   const $food = $(` <article class="food-container">
//            <img class="food-picture" src="${foodsData.food_picture_url}"/>
//            <p class="food-name">${foodsData.title}</p>
//            <p class="food-price">${foodsData.price_cents}</p>
//             <button type="button" class="add-menu-btn"> + </button>
//         </article>`);
//         return $food;
// };

// const renderFoods = function (foods) {
//   let $element;
//   const $container = $('#menu-section');
//   for (const food of foods) {
//     $element = createFoodElement(food);
//     $container.append($element);
//   }
// }

// const loadFoods = function () {
//   $.ajax('/order', { method: 'GET' })
//   .then(renderFoods(foodsData));
// };

// const addFoodToList = function (foodsData) {
//   const $foodItem = $(` <ol>
//             <li>Item:${foodsData.title}</li>
//             <li>Price:${foodsData.price_cents} Qty:</li>
//           </ol>`);
//           return $foodItem;
// }

// const addFoodToList = function () {
//   const $container = $('#order-list-section');
//   $(".add-menu-btn").on("click", function (){
//     $container.append(addFoodToList());
//     })
// }

// 1 function to increase the quantitiy
// 1 function to increase the price
// 1 function to append the food
// 1 functon to delete the food

const addFoodElement = (name, price) => {
  const foodItem = `
  <tr>
  <td id="food-name">${name}</td>
  <td id="food-price">${price}</td><br>
  <td id="food-quantity">1</td>
</tr>
  `
  return foodItem;
}

const appendFoodtoList = () => {
  const container = $("#order-list-section");
  $(".add-menu-btn").click(function (evt) {
    container.append(addFoodElement(evt.target.parentElement.children[1].textContent, evt.target.parentElement.children[2].textContent));
  })
}


// const subtractFoodToList = function () {
//   const $container = $('#order-list-section');
//   $(".add-menu-btn").on("click", function (){
//     $container.append(addFoodToList());
//     })
// }
