const express = require('express');
const router  = express.Router();
const {sendTextToAdmin} = require("../helpers/sms_helpers")


module.exports = (db) => {

  router.get("/:id", (req, res) => {
    const queryString = `
    SELECT * FROM foods
    ORDER BY title;
    `;
    return db.query(queryString).then(resolve => resolve.rows)
    .then(items => {
      res.render("order", {data: req.session, items});
    })
  });

  router.post("/:id/confirm", async (req, res) => {
    // Array of foods being ordered
    const keys = Object.keys(req.body)
    const order_id = req.session.cart.cart_id
    const queryString = `
    UPDATE orders
    SET order_processed = TRUE
    where id = ${order_id}
    RETURNING *;
    `;
    return db.query(queryString)
      .then(async () => {
        //console.log('keys', keys) // Whatever they had in the cart
        const asyncRes = await Promise.all(keys.map(async (key) => {
          let sql =`
          SELECT id
          FROM foods
          `
          let str= ''
          str += `WHERE title='${key}' ;`
          sql+= str;
          const results = await db.query(sql)
           .then((results)=> {
              //console.log('results.rows[0]', results.rows[0].id) // food id
              //console.log('key', key) // Food name
               foods = {
                title: key,
                id: results.rows[0].id,
                quantity: Number(req.body[key])
              }
              return foods  //returning each foods obj one at a time
           })
           .then(async (foodObj) => {
             //console.log('Food OBJ',foodObj)
             await db.query(`
             INSERT INTO food_carts (food_id, quantity, order_id)
             VALUES (${foodObj.id}, ${foodObj.quantity}, ${order_id})`)
           })
        }));
        return db.query(`
        SELECT title, quantity, price_cents
        FROM foods
        JOIN food_carts ON foods.id = food_id
        WHERE order_id=${order_id};`)
          .then((cart) => {
            const cartPrices = [];
            //For each item in the cart price * quantity then store in array
            cart.rows.map((item) => {
              cartPrices.push(item.quantity * item.price_cents)
              })

            //Define and call order total accumulator with array created above
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const finalPrice  = cartPrices.reduce(reducer) / 100;

            //render with cookie obj which has user and cart info
            res.render("thank-you", {data: req.session, cart: cart.rows, price: finalPrice})
          })
      })
  })
  return router;
}


//   router.post("/:id/confirm", (req, res) => {
//     const order_id = req.session.cart.cart_id
//     // will need to create a cart first
//     confirmOrder(order_id)
// //     .then(() => {
//       sendTextToAdmin(order_id);
//       console.log('HERE!')
//       res.render("thank-you", {data: req.session})
//     })
//   })

//   return router;
// };
