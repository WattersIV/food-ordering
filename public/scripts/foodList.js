$(document).ready(function(){
 appendFoodToList();
 totalCostCalulator();
});

const addFoodElement = (name, price) => {
  //White space cant be in name
  const newName = name.replace(/\s/g, '')
  const foodItem = `
  <tr>
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
  let nam;
  //Last thing staticly created in ejs
  const container = $("#order-container");
  $(".add-menu-btn").click(function (evt) {
    container.append(addFoodElement(evt.target.parentElement.children[1].textContent, evt.target.parentElement.children[2].textContent))
    nam = $(this).attr('name').replace(/\s/g, '')
    total(evt);
  });

    container.on("click", `.qtyplus`, e => {
      //target sibiling of the target
      const fieldName = $(e.target).siblings("input.qty")
      let currentVal = parseInt(fieldName.val());
      console.log(fieldName, currentVal)
      if (!isNaN(currentVal)) {
          fieldName.val(currentVal + 1);
          total(e);
      } else {
        console.log('else')
          fieldName.val(0);
      }
    });


     container.on("click", `.qtyminus`, e => {
      const fieldName = $(e.target).siblings("input.qty")
      let currentVal = parseInt(fieldName.val());
      console.log(fieldName, currentVal)
      if (!isNaN(currentVal) && currentVal > 0) {
          fieldName.val(currentVal - 1);
          total(e);
      } else {
          fieldName.val(0);
      }
  });

};

 const total = function() {
    const orderList = $("input.qty");
    let total = 0;
    for (const order of orderList) {
      const price = Number($("#food-price").text());
      const quantity =  Number($(order).val());
      total += price * quantity;
    }
    $("#total-price").text(`$ ${total}`);
  };

const totalCostCalulator = function(event) {
  $(".qtyplus").on("click", function () {
    console.log("plus btn clicked!");
    total(event);
  });
  $(".qtyminus").on("click", function (event) {
    console.log("minus btn clicked!");
    total(event);
  });
};

