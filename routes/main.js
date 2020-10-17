const express = require('express');
const router  = express.Router();
// const { Pool } = require('pg');
// const dbParams = require('../lib/db.js');
// const db = new Pool(dbParams);
// db.connect();



module.exports = (db) => {
  return router.post("/", function (req, res) {
    //console.log('body', req.body);
    const queryList = [req.body.name, req.body.email, req.body.phone, req.body.address, req.body.postal_code];
    const queryParams = [];

    //filters out undefinded
    for (const query of queryList) {
      if (query !== undefined) {
        queryParams.push(query);
      }
    }
    //console.log(queryParams)
    const queryString = `
      INSERT INTO users (name, email, phone, address, postal_code)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`;
    //db.query(queryString, queryParams)
    //   .then(data => {
    //     console.log(data.rows)
    //   })
    // .catch(err => console.log(err))
    const testUser = ['THHIS IS A NAME', 'EMAIL IS THIS', 'PHONE HERE', null, null,]
    db.query(queryString, ['THHIS IS A NAME', 'EMAIL IS THIS', 'PHONE HERE', null, null,], (err, result) => {
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows[0]) // brianc
    })
  })
}

