const {sendTexttoCustomer, sendTextToAdmin} = require("../../helpers/sms_helpers");


$(document).ready(function(event) {  $("#confirmation").click(function() {
    if ($("orderID").val() > 0) {
      sendTextToAdmin($("orderID").text());
    }
  })
})
