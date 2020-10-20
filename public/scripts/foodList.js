$(document).ready(function(){
 appendFoodToList();
});

const foodItems = {};

const addFoodElement = (name, price) => {
  const foodItem = `
  <tr>
    <td id="food-name">${name}</td>
    <td id="food-price">${price}</td>
    <td id="food-quantity">
      <form  id='${name}' method='POST' action='#'>
        <input type='button' value='-' id='${name}-minus' class='qtyminus' field='quantity' />
        <input type='text' name='${name}-quantity' value='0' class='qty' />
        <input type='button' value='+' id='${name}-plus' class='qtyplus' field='quantity' />
      </form>
    </td>
  </tr>
  `;
  console.log('LOOK HERE!',name)
  foodItems
  return foodItem;
}

const appendFoodToList = () => {
  let nam;
  const container = $("#order-container");
  $(".add-menu-btn").click(function (evt) {
    container.append(addFoodElement(evt.target.parentElement.children[1].textContent, evt.target.parentElement.children[2].textContent))
    console.log($(this).attr('name'))
    nam = $(this).attr('name');
  });

    container.on("click", `.qtyplus`, e => {
      const fieldName = `${nam}-quantity`;
      let currentVal = parseInt($(`input[name=${nam}-quantity]`).val());
      console.log(fieldName, currentVal)
      if (!isNaN(currentVal)) {
        console.log('if')
          $(`input[name=${fieldName}]`).val(currentVal + 1);
      } else {
        console.log('else')
          $(`input[name=${nam}-quantity]`).val(0);
      }
    });


     container.on("click", `.qtyminus`, e => {
      const fieldName = `${nam}-quantity`;
      let currentVal = parseInt($(`input[name=${fieldName}]`).val());
      console.log(fieldName, currentVal)
      if (!isNaN(currentVal) && currentVal > 0) {
          $(`input[name=${fieldName}]`).val(currentVal - 1);
      } else {
          $(`input[name=${fieldName}]`).val(0);
      }
  });

};


