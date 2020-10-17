module.exports = db => {
const getAllFoods = () => {
  const queryString =
  `SELECT foods.*
  FROM foods
  GROUP BY type`
  return pool.query(queryString)
  .then(response => response.rows);
};

// function to list unconfirmed orders
const getUnconfOrders = () => {
  const queryString = `
  SELECT id FROM orders
  WHERE order_completed = false;
  `;
  return pool.query(queryString)
  .then(response => response.rows)
};

return {
  getAllFoods,
  getUnconfOrders
}
}


