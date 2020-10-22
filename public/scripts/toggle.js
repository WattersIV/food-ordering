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
    if ($(".take-out-visible").is(':visible')){
    $(".takeout-reg").slideUp("slow");
    } else {
    $(".takeout-reg").slideDown("slow");
    }
  });
}

const deliveryButtonHandler = () => {
  $("#delivery").click(function() {
    takeoutClicked === true ? takeoutClicked = false : null;
    deliveryClicked = true;
    diableButton();
    if ($(".delivery-visible").is(':visible')){
    $(".delivery-reg").slideUp("slow");
    } else {
    $(".delivery-reg").slideDown("slow");
    }
  });
}

const diableButton = () => {
  if (deliveryClicked === true) {
    $("#delivery").prop('disabled', true);
    $("#takeout").prop('disabled', false);
    $(".takeout-reg").slideUp("slow");
  }
  else if (takeoutClicked === true) {
    $("#takeout").prop('disabled', true);
    $("#delivery").prop('disabled', false);
    $(".delivery-reg").slideUp("slow");
  }
}
