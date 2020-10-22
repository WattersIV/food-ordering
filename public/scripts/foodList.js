$(document).ready(function(){
 appendFoodToList();
 totalCostCalulator();
});


const cart = [];

const addFoodElement = (name, price) => {
  //White space cant be in name
  const newName = name.replace(/\s/g, '')
  const foodItem = `
  <tr id="${cart.length}">
    <td id="food-name">${newName}</td>
    <td id="food-price">${price}</td>
    <td id="food-quantity">
      <form  id='${newName}' method='POST' action='#'>
        <input type='button' value='-' id='${newName}-minus' class='qtyminus' field='quantity' />
        <input type='text' name='${newName}-quantity' value='1' class='qty' />
        <input type='button' value='+' id='${newName}-plus' class='qtyplus' field='quantity' />
      </form>
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
      console.log(fieldName, currentVal)
      if (!isNaN(currentVal)) {
          fieldName.val(currentVal + 1);
      } else {
        console.log('else')
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
      console.log("what is value?", value)
      console.log("Check Value: ", parseInt(value.price), accumulator);
      return accumulator += parseInt(value.price) * value.quantity;
    }, 0);
    $("#total-price").text(`$ ${total}`);
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


