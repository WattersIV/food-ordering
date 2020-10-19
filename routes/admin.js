const express = require('express');
const router  = express.Router();



module.exports = (db) => {

router.get("/login", (req, res) => {
  res.render("admin_login")
});

const getOrders = () => {
  const queryString = `
  SELECT id from orders;
  `
  return db.query(queryString).then(resolve => resolve.rows)
}

router.get("/main_page", (req, res) => {
  getOrders()
  .then(orders => {
    res.render("admin", {orders, page: "admin"})
  })
  .catch(err => console.log(err))
});

const getFoodItems = () => {
  const queryString = `
  SELECT * FROM foods
  ORDER BY title;
  `;
  return db.query(queryString).then(resolve => resolve.rows)
};

router.get("/edit_menu", (req, res) => {
  getFoodItems()
  .then(items => {
    res.render("edit_menu", {items, page: "edit_menu"})
  })
});

const getFoodItemsById = (food_id) => {
  const queryString = `
  SELECT * FROM foods
  WHERE id = ${food_id};
  `;
  return db.query(queryString).then(resolve => resolve.rows[0]);
}

router.get("/edit_menu/:id/edit", (req, res) => {
  const foodID = req.params.id;
  if (req.session.isAuthenticated) {
  getFoodItemsById(foodID)
  .then(item => {
    res.render("edit_foodInfo", {item, page: "edit_foodInfo"})
  })
}
})

router.post("/login", (req, res) => {
  if (req.body.password === "food") {
    req.session.isAuthenticated = true;
    res.redirect("/admin/main_page")
  } else {
  res.redirect("/admin/login")
  }
});

router.post("/logout", (req, res) => {
  req.session.isAuthenticated = false;
  res.redirect("/admin/login")
})

// delete is not working
const deleteFoodItem = (food_id) => {
  const queryString = `
  DELETE FROM foods WHERE id = ${food_id}
  `;
  db.query(queryString).then(console.log("successfully deleted"))

}

router.post("edit_menu/:id/delete", (req, res) => {
  const foodID = req.params.id;
  if (req.session.isAuthenticated) {
  deleteFoodItem(foodID)
  .then(res.redirect("/admin/edit_menu"))
  }
});

router.post("/edit_menu/:id/edit", (req, res) => {
  const updateMenuItem = (food_id) => {
    const queryString = `
    UPDATE foods
    SET title = $1, food_picture_url = $2, price_cents = $3, type = $4
    WHERE id = ${food_id}
    RETURNING *;
    `;
    const queryParams = [req.body.title, req.body.picture, req.body.price, req.body.type];
    return db.query(queryString,queryParams)
    .then(resolve => resolve.row)
    .catch(err => console.log(err))
  };

  const foodID = req.params.id;
  if (req.session.isAuthenticated) {
  updateMenuItem(foodID)
  .then(res.redirect("/admin/edit_menu"))
  }
})

return router
}
