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

  const getFoodItemsByName = () => {
    const queryString = `
    SELECT title FROM foods;
    `;
    return db.query(queryString).then(resolve => console.log(resolve.rows))
  };

  const renderFoods = getFoodItemsByName()

  console.log(renderFoods)
  // const test = param => {
  //   for (const check of param) {
  //     console.log(check)
  //   }
  // };

  // // let first = [1,2,3,4]

  // // test(first)


  templateVars = {
    renderFoods
  };

  res.render("edit_menu", templateVars)
});

return router
}
