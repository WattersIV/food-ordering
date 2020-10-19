const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const getFoodItems = () => {
    const queryString = `SELECT * FROM foods;`;
      return db.query(queryString).then(res => res.rows);
  };

  router.get("/", (req, res) => {
    getFoodItems()
      .then(items => {
        console.log("CHECKKKKKKKK")
        console.log(items);
        res.render("order", {items, page: "order"})
    })
  })

  return router;

};
