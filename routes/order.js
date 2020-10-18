const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const getFoodItems = () => {
    const queryString = `
      SELECT * FROM foods;`
      return db.query(queryString).then(res => res.rows)
  };

  router.get("/", (req, res) => {
    getFoodItems()
    .then(items => {
      res.render("/order", { items })
    })
  })
  return router;
};

