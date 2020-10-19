$(document).ready(function(){
 appendFoodToList();
});

const changeQuantity = (event) => {

  let currentValue = event.target.nextSibling.nextSibling.innerHTML;

  console.log("Current Value: ", currentValue);
  // if (id === "increase") {
  //   // let currentValue = $(evt.target.parentElement.children[1].textContent).siblings(".quantity").val();
  //   console.log(currentValue);
  //   $(this).siblings(".quantity").val(currentValue += 1);
  // };
  if (id === "decrease") {
    let newVal = currentValue - 1;
    console.log(newVal);
    $(event.target.nextSibling).html(newVal);
  }
  // evt.preventDefault();
}

const cq = () => {
  event.stopPropagation();
  console.log("Hello World");
}

const addFoodElement = (name, price) => {
  const foodItem = `
  <tr>
    <td id="food-name">${name}</td>
    <td id="food-price">${price}</td>
    <td id="food-quantity">
      <button id="decrease" type="button" onclick="${cq}">-</button>
      <span class="quantity">1</span>
      <button id="increase" type="button">+</button>
    </td>
  </tr>
  `;
  return foodItem;
}

const appendFoodToList = () => {
  const container = $("#order-container");
  $(".add-menu-btn").click(function (evt) {
    console.log("CLIIIIIIICKED")
    container.append(addFoodElement(evt.target.parentElement.children[1].textContent, evt.target.parentElement.children[2].textContent))
  });
};

const removeFoodFromList = () => {
  const container = $("#order-container");
  $(".subtract-menu-btn").click(function (evt) {
    container.remove();
  });
};
