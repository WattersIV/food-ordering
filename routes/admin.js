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

router.get("/edit_menu", (req, res) => {
  res.render("edit_menu")
});

return router
}
