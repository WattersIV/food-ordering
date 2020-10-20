const express = require('express');
const router  = express.Router();
const app        = express();
app.set("view engine", "ejs");


module.exports = (db) => {
  return router.post("/", function (req, res) {
    const queryList = [req.body.name, req.body.email, req.body.phone, req.body.address, req.body.postal_code];
    let queryParams = [];

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

      const qString = `
      SELECT users.id
      FROM users
      WHERE name LIKE '%${req.body.name}%'
      AND email LIKE '%${req.body.email}%'
      AND phone LIKE '%${req.body.phone}%';`

      // Gets users id
      db.query(qString, function (err, results) {
      if (err) {
        console.log(err)
      } else {

        db.query(`
        SELECT *
        FROM users
        WHERE users.id=${results.rows[0].id};`, function (eror, results, fields) {
          //Gives name to user object for cookie
          const users = {id: results.rows[0].id,
                  name: results.rows[0].name,
                  email: results.rows[0].email,
                  address: results.rows[0].address,
                  postal_code: results.rows[0].postal_code }

          //set cookie for user
          req.session.user = users;

          //making cart
          const cart = db.query(`
          INSERT INTO orders (user_id)
          VALUES (${results.rows[0].id})
          RETURNING *;`)
            .then((data) => {


              let cookie = {cart_id: data.rows[0].id,
                            order_completed: data.rows[0].order_completed};

              //Set cookie for cart
              req.session.cart = cookie;
              console.log(req.session.cart.cart_id)
              //console.log(req.session.user)
            })

            //Redirect to order/:id
             .then(() => {
                console.log(req.session.cart.cart_id)
                res.redirect(`order/${req.session.cart.cart_id}`)
             })
        });
      }})
    })
  })
}

