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
    let foods = {}
    db.query(queryString)
      .then(async () => {
        console.log('keys', keys) // [ 'Spaghetti Bolonese', 'Frutti di Mare', 'Carbonara' ]
        // Loop through all food names and get id from the DB

        // https://stackoverflow.com/questions/36094865/how-to-do-promise-all-for-array-of-array-of-promises
        // https://stackoverflow.com/questions/39452083/using-promise-function-inside-javascript-array-map
        // https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/

        // Possible option if you want to use a loop still.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of

        const asyncRes = await Promise.all(keys.map(async (key) => {
          let sql =`
          SELECT id
          FROM foods
          `
          let str= ''
          str += `WHERE title='${key}' ;`
          sql+= str;
          console.log("str", str);
          const results = await db.query(sql)
          console.log("results", results.rows[0].id);
          // const foody = (results) => {
          //     console.log('data.rows[0].id', data.rows[0].id) // 1
          //     foods[keys[i]] = {
          //       title: keys[i],
          //       id: data.rows[0].id,
          //       quantity: Number(req.body[keys[i]])
          //     }
          //     console.log('LINE 46', foods) //OBJ
          //     if (i === keys.length - 1) {
          //       return foods;
          //     }
          // }
          //  sleep(10);
          // return foody
        }));
      })
        // for (let i = 0; i < keys.length; i++) {
  })
  return router;
}

          // await function call
          // await function call
          // await function call
          // Promise.all([array of promises])
        // }
        //console.log('ORDER HERE', foods)
          // return foods
      // })//.then(() => console.log('LINE 55', foods)) //UNDEF



    // .then(() => {
    //   db.query(`
    //   INSERT INTO food_carts (order_id, food_id, quantity)
    //   VALUES()`)
    // })
  //   .then((result) => {
  //     console.log('000000000000000',result)
  //     res.render("thank-you", {data: req.session})
  //   })
  //   .catch((err) => console.log(err))





