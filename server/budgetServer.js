const express = require("express");
const app = express();
const cors = require('cors');
const {Pool} = require("pg");
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "budget",
    password: "ender",
    port: 5432,
});

app.use(bodyParser.json());

// Categories endpoints

// Get all categories
app.get('/categories', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM categories');
        res.status(200).json({
                status: "success",
                data: {
                  id: rows[0].id,
                    name: rows[0].name

                }
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get a single category
app.get('/categories/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const {rows} = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
        if (rows.length === 0) {
            res.status(404).send('Category not found');
        } else {
            res.status(200).json({
                    status: "success",
                    data: {
                        categories: rows[0]
                    }
                }
            );
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Create a category
app.post('/categories', async (req, res) => {
    const {name} = req.body;
    try {
        const {rows} = await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
        res.status(201).json({
                status: "success",
                data: {
                    id: rows[0].id,
                    name: rows[0].name
                }
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update a category
app.put('/categories/:id', async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    try {
        const {rows} = await pool.query('UPDATE categories SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
        if (rows.length === 0) {
            res.status(404).send('Category not found');
        } else {
            res.status(200).json({
                    status: "success",
                    data: {
                        id: rows[0].id,
                        name: rows[0].name
                    }
                }
            );
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete a category
app.delete('/categories/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const {rows} = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
        if (rows.length === 0) {
            res.status(404).send('Category not found');
        } else {
          res.status(200).json({
                    status: "success",
                  message: "Category deleted"
          });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// Budget endpoints

// Get all budget items
app.get('/budget', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM budget');
       res.status(200).json({
                status: "success",
                data: {
                    id: rows[0].id,
                    category_id: rows[0].category_id,
                    description: rows[0].description,
                    amount: rows[0].amount
                }
       });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get a single budget item
app.get('/budget/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const {rows} = await pool.query('SELECT * FROM budget WHERE id = $1', [id]);
        if (rows.length === 0) {
            res.status(404).send('Budget item not found');
        } else {
           res.status(200).json({
                status: "success",
                data: {
                    id: rows[0].id,
                    category_id: rows[0].category_id,
                    description: rows[0].description,
                    amount: rows[0].amount
                }
           });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Create a budget item
app.post('/budget', async (req, res) => {
    const {category_id, description, amount} = req.body;
    try {
        const {rows} = await pool.query('INSERT INTO budget (category_id, description, amount) VALUES ($1, $2, $3) RETURNING *', [category_id, description, amount]);
        res.status(201).json({
                status: "success",
                data: {
                    id: rows[0].id,
                    category_id: rows[0].category_id,
                    description: rows[0].description,
                    amount: rows[0].amount

                }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update a budget item
app.put('/budget/:id', async (req, res) => {
    const {id} = req.params;
    const {category_id, description, amount} = req.body;
    try {
        const {rows} = await pool.query('UPDATE budget SET category_id = $1, description = $2, amount = $3 WHERE id = $4 RETURNING *', [category_id, description, amount, id]);
        if (rows.length === 0) {
            res.status(404).send('Budget item not found');
        } else {
            res.send(rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete a budget item
app.delete('/budget/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const {rows} = await pool.query('DELETE FROM budget WHERE id = $1 RETURNING *', [id]);
        if (rows.length === 0) {
            res.status(404).send('Budget item not found');
        } else {
            res.send(rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(3001, () => {
    console.log('Server started on port 301');
});