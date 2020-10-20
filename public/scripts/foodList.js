$(document).ready(function(){
 appendFoodToList();
});


const addFoodElement = (name, price) => {
  const foodItem = `
  <tr>
    <td id="food-name">${name}</td>
    <td id="food-price">${price}</td>
    <td id="food-quantity">
    <form id='myform' method='POST' action='#'>
    <input type='button' value='-' class='qtyminus' field='quantity' />
    <input type='text' name='quantity' value='0' class='qty' />
    <input type='button' value='+' class='qtyplus' field='quantity' />
</form>
    </td>
  </tr>
  `;
  return foodItem;
}

const appendFoodToList = () => {
  const container = $("#order-container");
  $(".add-menu-btn").click(function (evt) {
    container.append(addFoodElement(evt.target.parentElement.children[1].textContent, evt.target.parentElement.children[2].textContent))
    $('.qtyplus').click(function(event){
      event.preventDefault();
      fieldName = $(this).attr('field');
      let currentVal = parseInt($(`input[name=${fieldName}]`).val());
      if (!isNaN(currentVal)) {
          $(`input[name=${fieldName}]`).val(currentVal + 1);
      } else {
          $(`input[name=${fieldName}]`).val(0);
      }
  });
  $(".qtyminus").click(function(event) {
      event.preventDefault();
      fieldName = $(this).attr('field');
      let currentVal = parseInt($(`input[name=${fieldName}]`).val());
      if (!isNaN(currentVal) && currentVal > 0) {
          $(`input[name=${fieldName}]`).val(currentVal - 1);
      } else {
          $(`input[name=${fieldName}]`).val(0);
      }
  });
  });
};


