$(document).ready(function() {
  takeoutButtonsHandler();
  deliveryButtonHandler();
});

const takeoutButtonsHandler = () => {
  $("#takeout").click(function() {
    if ($(".takeout-reg").is(':visible')){
    $(".takeout-reg").slideUp("slow");
    } else {
    $(".takeout-reg").slideDown("slow");
    }
  });
}

const deliveryButtonHandler = () => {
  $("#delivery").click(function() {
    if ($(".delivery-reg").is(':visible')){
    $(".delivery-reg").slideUp("slow");
    } else {
    $(".delivery-reg").slideDown("slow");
    }
  });
}
