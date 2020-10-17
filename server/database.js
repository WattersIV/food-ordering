const getAllFoods = function() {
  const queryString = 
  `SELECT foods.*
  FROM foods
  GROUP BY type`
  return pool.query(queryString)
  .then(res => res.rows); 
}

exports.getAllFoods = getAllFoods; 