$(document).ready(function(){
 appendFoodToList();
});

const foodItems = {};

const addFoodElement = (name, price) => {
  const newName = name.replace(/\s/g, '')
  const foodItem = `
  <tr>
    <td id="food-name">${newName}</td>
    <td id="food-price">${price}</td>
    <td id="food-quantity">
      <form  id='${newName}' method='POST' action='#'>
        <input type='button' value='-' id='${newName}-minus' class='qtyminus' field='quantity' />
        <input type='text' name='${newName}-quantity' value='0' class='qty' />
        <input type='button' value='+' id='${newName}-plus' class='qtyplus' field='quantity' />
      </form>
    </td>
  </tr>
  `;
  console.log('LOOK HERE!',newName)
  foodItems
  return foodItem;
}

const appendFoodToList = () => {
  let nam;
  const container = $("#order-container");
  $(".add-menu-btn").click(function (evt) {
    container.append(addFoodElement(evt.target.parentElement.children[1].textContent, evt.target.parentElement.children[2].textContent))
    console.log($(this).attr('name'))
    nam = $(this).attr('name').replace(/\s/g, '')
  });

    container.on("click", `.qtyplus`, e => {

      const fieldName = $(e.target).siblings("input.qty")
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
      console.log(fieldName, currentVal)
      if (!isNaN(currentVal) && currentVal > 0) {
          fieldName.val(currentVal - 1);
      } else {
          fieldName.val(0);
      }
  });

};


