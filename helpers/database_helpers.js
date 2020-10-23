module.exports = (db) => {

const getOrders = () => {
  const queryString = `
  SELECT id from orders
  WHERE order_completed = FALSE AND order_processed = TRUE;
  `;
  return db.query(queryString).then(resolve => resolve.rows)
};

const getFoodItems = () => {
  const queryString = `
  SELECT * FROM foods
  ORDER BY title;
  `;
  return db.query(queryString).then(resolve => resolve.rows)
};

const getFoodItemsById = (food_id) => {
  const queryString = `
  SELECT * FROM foods
  WHERE id = ${food_id};
  `;
  return db.query(queryString).then(resolve => resolve.rows[0]);
};

const updateMenuItem = (food_id, queryParams) => {
  const queryString = `
  UPDATE foods
  SET title = $1, food_picture_url = $2, price_cents = $3, type = $4
  WHERE id = ${food_id}
  RETURNING *;
  `;
  return db.query(queryString,queryParams)
  .then(resolve => resolve.row)
  .catch(err => console.log(err))
};

const deleteFoodItem = (food_id) => {
  const queryString = `
  DELETE FROM foods WHERE id = ${food_id}
  `;
  return db.query(queryString).then(console.log("successfully deleted"))
}

const completeOrder = (order_id) => {
  const queryString = `
  UPDATE orders
  SET order_completed = TRUE
  WHERE id = ${order_id}
  RETURNING *;
  `;
  console.log("success")
  return db.query(queryString)
};

const getPhoneNumberById = (order_id) => {
  const queryString = `
  SELECT users.phone
  FROM orders
  JOIN users ON user_id = users.id
  where orders.id = ${order_id} AND order_completed = FALSE;
  `
  return db.query(queryString).then(resolve => resolve.rows)
};


return {
getOrders,
getFoodItems,
getFoodItemsById,
updateMenuItem,
deleteFoodItem,
completeOrder,
getPhoneNumberById,
};

}
