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
    const keys = Object.keys(req.body)
    const order_id = req.session.cart.cart_id
    const queryString = `
    UPDATE orders
    SET order_processed = TRUE
    where id = ${order_id}
    RETURNING *;
    `;
    db.query(queryString)
      .then(() => {
        let foods = {}
        console.log(keys)

        for (let i = 0; i < keys.length; i++) {
          let sql =`
          SELECT id
          FROM foods
          `
          let str= ''
          str += `WHERE title='${keys[i]}' ;`
          sql+= str;
          db.query(sql)
            .then ((data) => {
            //console.log(data.rows[0].id, req.body[name])
              foods[keys[i]] = {title: keys[i],
                                id: data.rows[0].id,
                                quantity: Number(req.body[keys[i]])}
              if (i === keys.length - 1){
                console.log('LINE 46', foods) //OBJ
                return foods;
              }
            })
        }
        //console.log('ORDER HERE', foods)
        return foods
      })
      .then((data) => console.log('LINE 55', data)) //UNDEF


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
   })



  return router;
  };
