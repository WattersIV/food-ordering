$(document).ready(function(){
 appendFoodToList();
});

const addFoodElement = (name, price) => {
  //White space cant be in name
  const newName = name.replace(/\s/g, '')
  const foodItem = `
  <tr>
    <td id="food-name">${name}</td>
    <td id="food-price">${price}</td>
    <td id="food-quantity">
        <input type='button' value='-' id='${newName}-minus' class='qtyminus' field='quantity' />
        <input type='text' name='${name}' value='1' class='qty' />
        <input type='button' value='+' id='${newName}-plus' class='qtyplus' field='quantity' />
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
  });

    container.on("click", `.qtyplus`, e => {
      //target sibiling of the target
      const fieldName = $(e.target).siblings("input.qty")
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
      if (!isNaN(currentVal) && currentVal > 0) {
          fieldName.val(currentVal - 1);
      } else {
          fieldName.val(0);
      }
  });

};


