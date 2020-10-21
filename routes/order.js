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

  router.get("/:id/confirm", (req, res) => {
    res.render("thank-you", {data: req.session})
  })





  return router;

};
