const express = require('express');
const router  = express.Router();



module.exports = (db) => {

router.get("/login", (req, res) => {
  res.render("admin_login")
});

router.post("/login", (req, res) => {
  if (req.body.password === "food") {
    res.redirect("/admin/main_page")
  } else {
  res.redirect("/admin/login")
  }
});

router.get("/main_page", (req, res) => {
  res.render("admin")
});

const getFoodItemsByName = () => {
  const queryString = `
  SELECT title FROM foods;
  `;
  return db.query(queryString).then(resolve => resolve.rows)
};

router.get("/edit_menu", (req, res) => {
  getFoodItemsByName()
  .then(items => {
    res.render("edit_menu", {items, page: "edit_menu"})
  })
});

return router
}
