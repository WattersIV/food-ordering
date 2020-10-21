const express = require('express');
const router  = express.Router();

module.exports = ({getFoodItems, confirmOrder}) => {


  router.get("/:id", (req, res) => {
    getFoodItems()
    .then(items => {
      res.render("order", {data: req.session, items});
    })
  });

  // change to a function

  router.post("/:id/confirm", (req, res) => {
    const order_id = req.session.cart.cart_id

    confirmOrder(order_id)
    .then(() => {
      console.log('HERE!')
      res.render("thank-you", {data: req.session})
    })
  })



  return router;

};
