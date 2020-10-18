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
    if ($(".takeout-reg").is(':visible')){
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
    if ($(".delivery-reg").is(':visible')){
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
  }
  else if (takeoutClicked === true && deliveryClicked === false) {
    $("#takeout").prop('disabled', true);
    $("#delivery").prop('disabled', false);
  }
}
