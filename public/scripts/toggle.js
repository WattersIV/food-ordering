$(document).ready(function() {
  takeoutButtonsHandler();
  deliveryButtonHandler();
});

const takeoutButtonsHandler = () => {
  $("#takeout").click(function() {
    $("#takeout").prop('disabled', true);
    if ($(".takeout-reg").is(':visible')){
    $(".takeout-reg").slideUp("slow");
    } else {
    $(".takeout-reg").slideDown("slow");
    }
  });
}

const deliveryButtonHandler = () => {
  $("#delivery").click(function() {
    $("#delivery").prop('disabled', true);
    if ($(".delivery-reg").is(':visible')){
    $(".delivery-reg").slideUp("slow");
    } else {
    $(".delivery-reg").slideDown("slow");
    }
  });
}
