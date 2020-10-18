const express = require('express');
const router  = express.Router();

<<<<<<< HEAD
// module.exports = (db) => {
//   get compare cookie to DB and get info
// };
=======
module.exports = (db) => {
  router.get("/", (req, res, next) => {
    return db.foods.all()
    .then((data) => {
      res.render("/order", { data });
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    })
  })
  return router;
};
>>>>>>> feature/order


