$(document).ready(function(){
 appendFoodToList();
 totalCostCalulator();
});


const cart = [];

const addFoodElement = (name, price) => {
  //White space cant be in name
  const foodItem = `
  <tr id="${cart.length}">
    <td id="food-name">${name}</td>
    <td id="food-price">$${price}</td>
    <td id="food-quantity">
        <input type='button' value='-' id='${name}-minus' class='qtyminus' field='quantity' />
        <input type='text' name='${name}' value='1' class='qty' />
        <input type='button' value='+' id='${name}-plus' class='qtyplus' field='quantity' />
    </td>
  </tr>
  `;

  return foodItem;
}

const appendFoodToList = () => {

  //Last thing staticly created in ejs
  const container = $("#order-container");
  $(".add-menu-btn").click(function (evt) {
    const foodTitle = evt.target.parentElement.children[1].textContent;
    const foodPrice = evt.target.parentElement.children[2].textContent;
    console.log("Food Title/Price: ", foodTitle, foodPrice)
    cart.push({
      "title": foodTitle,
      "price": foodPrice,
      "quantity": 1
    });
    container.append(addFoodElement(foodTitle, foodPrice))

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
      if (!isNaN(currentVal) && currentVal > 0) {
          fieldName.val(currentVal - 1);
      } else {
          fieldName.val(0);
      }
  });
};



  const calculateTotal = function() {

    const total = cart.reduce((accumulator, value) => {
      return accumulator += parseFloat(value.price) * value.quantity;
    }, 0);

    if (total > 0) {
    $("#total-price").text(`$ ${total}`);
    } else {
      $("#total-price").text(`$ 0`);
    }
  };

    const changeQuantity = (foodId, typeOfCalculation) => {
      console.log(cart);
      console.log()
      const foodItem = cart[foodId - 1]
    if (typeOfCalculation === true) {
      foodItem.quantity += 1;
    } else {
      foodItem.quantity -= 1;
    }
    calculateTotal()
  }


