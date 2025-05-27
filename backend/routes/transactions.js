const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM transactions ORDER BY date DESC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { type, description, amount, date } = req.body;
  const sql = 'INSERT INTO transactions (type, description, amount, date) VALUES (?, ?, ?, ?)';
  db.query(sql, [type, description, amount, date], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId });
  });
});

module.exports = router;
