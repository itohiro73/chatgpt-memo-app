const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  user: 'memo_user',
  password: 'memo_password',
  host: 'localhost',
  port: 5432,
  database: 'memo_app',
});

app.use(express.json());

// Get all memos
app.get('/memos', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM memos');
  res.json(rows);
});

// Get a memo by ID
app.get('/memos/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM memos WHERE id = $1', [id]);

  if (rows.length === 0) {
    res.status(404).send('Memo not found');
  } else {
    res.json(rows[0]);
  }
});

// Create a new memo
app.post('/memos', async (req, res) => {
  const { title, content } = req.body;
  const { rows } = await pool.query('INSERT INTO memos (title, content) VALUES ($1, $2) RETURNING *', [title, content]);
  res.status(201).json(rows[0]);
});

// Update a memo by ID
app.put('/memos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const { rowCount } = await pool.query('UPDATE memos SET title = $1, content = $2, updated_at = NOW() WHERE id = $3', [title, content, id]);

  if (rowCount === 0) {
    res.status(404).send('Memo not found');
  } else {
    const { rows } = await pool.query('SELECT * FROM memos WHERE id = $1', [id]);
    res.json(rows[0]);
  }
});

// Delete a memo by ID
app.delete('/memos/:id', async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query('DELETE FROM memos WHERE id = $1', [id]);

  if (rowCount === 0) {
    res.status(404).send('Memo not found');
  } else {
    res.status(204).send();
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

