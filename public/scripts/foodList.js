$(document).ready(function(){
 appendFoodToList();
 totalCostCalulator();
});


const cart = [];

const addFoodElement = (name, price, id) => {
  //White space cant be in name
  const foodItem = `
  <tr id="${cart.length}">
    <td id="food-name">${name}</td>
    <td id="food-price">$${price}</td>
    <td id="food-quantity">
        <input type='button' value='-' id='${id}-minus' class='qtyminus' field='quantity' />
        <input type='text' name='${name}' value='1' class='qty' />
        <input type='button' value='+' id='${id}-plus' class='qtyplus' field='quantity' />
    </td>
  </tr>
  `;

  return foodItem;
}

const checkIfIncludesFoodName = (foodCart, foodName) => {
  if (foodCart.length === 0) {
    return false
  };
  for (const food of foodCart) {
    console.log("Food-Object: ", food)
    console.log("Food title: ", food.title)
    if (food.title === foodName) {
      console.log("is loop working")
      return true;
    }
  }
  return false;
};

const findIndexofCartFood = (foodCart, foodName) => {
  for (const food of foodCart) {
    if (food.title === foodName) {
      return foodCart.indexOf(food)
    }
  }
}

const appendFoodToList = () => {

  //Last thing staticly created in ejs
  const container = $("#order-container");
  $(".add-menu-btn").click(function (evt) {
    const foodID = $(evt.target).data('foodid')
    console.log("Food id is: ", foodID)
    const foodTitle = evt.target.parentElement.children[1].textContent;
    const foodPrice = evt.target.parentElement.children[2].textContent;
    foodDataId = findIndexofCartFood(cart, foodTitle);
    console.log("Current Cart: ", cart);
    console.log("What is the food title being passed through? ", foodTitle)
    console.log("Result of function: ", checkIfIncludesFoodName(cart, foodTitle));
    if (!checkIfIncludesFoodName(cart, foodTitle)) {
    cart.push({
      "title": foodTitle,
      "price": foodPrice,
      "quantity": 1
    });
    container.append(addFoodElement(foodTitle, foodPrice, foodID));
  } else {
    $(`#${foodID}-plus`).click();
  }



    calculateTotal(evt);
  });

    container.on("click", `.qtyplus`, e => {
      //target sibiling of the target
      const fieldName = $(e.target).siblings("input.qty")
      const foodID = $(e.target).closest("tr").attr("id")
      changeQuantity(foodID, true);
      let currentVal = parseInt(fieldName.val());
      if (!isNaN(currentVal)) {
          fieldName.val(currentVal + 1);
      } else {
          fieldName.val(0);
      }
    });


     container.on("click", `.qtyminus`, e => {
      const fieldName = $(e.target).siblings("input.qty")
      let currentVal = parseInt(fieldName.val());
      const foodID = $(e.target).closest("tr").attr("id")
      changeQuantity(foodID, false);
      if (!isNaN(currentVal) && currentVal > 1) {
          fieldName.val(currentVal - 1);
      } else {
          const indexOfFoodId = cart.indexOf(foodID);
          cart.splice(indexOfFoodId, 1)
          console.log("this is the cart right now: ",cart)
          $(e.target).closest("tr").remove()
      }
  });
};



  const calculateTotal = function() {

    const total = cart.reduce((accumulator, value) => {
      return accumulator += parseFloat(value.price) * value.quantity;
    }, 0);

    if (total > 0) {
    $("#total-price").text(`$ ${Math.round(total * 100)/ 100}`);
    } else {
      $("#total-price").text(`$ 0`);
    }
  };

    const changeQuantity = (foodId, typeOfCalculation) => {

      const foodItem = cart[foodId - 1]
    if (typeOfCalculation === true) {
      foodItem.quantity += 1;
    } else {
      foodItem.quantity -= 1;
    }
    calculateTotal()
  }


