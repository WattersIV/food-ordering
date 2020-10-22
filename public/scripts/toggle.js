$(document).ready(function() {
  takeoutButtonsHandler();
  deliveryButtonHandler();
});

let deliveryClicked = false;
let takeoutClicked = false;


const takeoutButtonsHandler = () => {
  $("#takeout").click(function() {
    deliveryClicked === true ? deliveryClicked = false : null;
    takeoutClicked = true;
    diableButton();
    if ($(".takeout-form").is(':visible')){
    $(".takeout-form").slideUp("slow");
    } else {
    $(".takeout-form").slideDown("slow");
    }
  });
}

const deliveryButtonHandler = () => {
  $("#delivery").click(function() {
    takeoutClicked === true ? takeoutClicked = false : null;
    deliveryClicked = true;
    diableButton();
    if ($(".delivery-form").is(':visible')){
    $(".delivery-form").slideUp("slow");
    } else {
    $(".delivery-form").slideDown("slow");
    }
  });
}

const diableButton = () => {
  if (deliveryClicked === true) {
    $("#delivery").prop('disabled', true);
    $("#takeout").prop('disabled', false);
    $(".takeout-form").slideUp("slow");
  }
  else if (takeoutClicked === true) {
    $("#takeout").prop('disabled', true);
    $("#delivery").prop('disabled', false);
    $(".delivery-form").slideUp("slow");
  }
}
