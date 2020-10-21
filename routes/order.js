const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const getFoodItems = () => {
    const queryString = `SELECT * FROM foods;`;
      return db.query(queryString).then(response => response.rows);
  };

  router.get("/:id", (req, res) => {
    getFoodItems()
    .then(items => {
      res.render("order", {data: req.session, items});
    })
  });

  router.post("/:id/confirm", (req, res) => {
    const order_id = req.session.cart.cart_id
    const queryString = `
    UPDATE orders
    SET order_processed = TRUE
    where id = ${order_id}
    RETURNING *;
    `;
    db.query(queryString)
    .then(() => {
      console.log('HERE!')
      res.render("thank-you", {data: req.session})
    })
  })



  return router;

};
