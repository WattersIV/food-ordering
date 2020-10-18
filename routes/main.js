const express = require('express');
const router  = express.Router();
const app        = express();
app.set("view engine", "ejs");



module.exports = (db) => {
  return router.post("/", function (req, res) {
    const queryList = [req.body.name, req.body.email, req.body.phone, req.body.address, req.body.postal_code];
    const queryParams = [];

    //filters out undefinded and replaces with null
    for (const query of queryList) {
      if (query !== undefined) {
        queryParams.push(query);
      } else {
        queryParams.push(null);
      }
    }
    const queryString = `
      INSERT INTO users (name, email, phone, address, postal_code)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`;

    db.query(queryString, queryParams)
      .then(() => {
        console.log('NAME HERE!!!', req.body.name)

      // Gets users id
      db.query(`
      SELECT users.id
      FROM users
      WHERE name LIKE '%${req.body.name}%'
      AND email LIKE '%${req.body.email}%'
      AND phone LIKE '%${req.body.phone}%';`, function (err, results) {
      if (err) {
        console.log(err)
      } else {
        //saves created users id and name as a cookies
        req.session.id = results.rows[0].id;
        req.session.name = req.body.name;
        res.redirect("/order")
      }})
    })
  })
}

