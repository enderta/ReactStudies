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
            message:`${rows.length} categories retrieved`,
                data: {
                 rows

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
                message: "Category retrieved",
                    data: {
                        rows
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
            message: "Category created",
                data: {
                 rows
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
                message: "Category updated",
                    data: {
                       rows
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
    const search = req.query.search || "";
    const sort = req.query.sort || "amount";
    const order = req.query.order || "desc";
    try {
        if(!search){
            const {rows} = await pool.query(`SELECT * FROM budget ORDER BY ${sort} ${order}`);
            res.status(200).json({
                    status: "success",
                message: `${rows.length} budget items found`,
                    data: {
                    rows
                    }
                }
            );
        }
        else {
            //join the categories table to the budget table and search for the search term in the category name or description
            const {rows} = await pool.query(`SELECT b.id,b.category_id,b.description,b.amount,c.name,c.id FROM budget b JOIN categories c ON b.category_id = c.id 
         WHERE c.name ILIKE $1 OR b.description ILIKE $1 ORDER BY ${sort} ${order}`, [`%${search}%`]);
            res.status(200).json({
                    status: "success",
                message: `${rows.length} budget items found for search term: ${search}`,
                    data: {
                        rows
                    }
            });
        }
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
               message: "Budget item found",
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
            message: "Budget item created",
                data: {
                   rows
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
            res.status(200).json({
                    status: "success",
                    message: "Budget item updated",
                    data: {
                      rows
                    }
                }
            );
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
            res.status(200).json({
                    status: "success",
                    message: "Budget item deleted"
                }
            );
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(3001, () => {
    console.log('Server started on port 301');
});