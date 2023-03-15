const express = require("express");
const app = express();
app.use(express.json());
const {Pool} = require("pg");

const cors = require('cors');
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todos",
    password: "ender",
    port: 5432,
});

app.use(cors({
    accessControlAllowOrigin: '*',
    accessControlAllowMethods: 'GET, POST, PUT, DELETE, OPTIONS',
    accessControlAllowHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    accessControlAllowCredentials: true,
}));

app.post("/api/todo", async (req, res) => {
    try {
        const {task} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO list (task) VALUES($1) RETURNING *",
            [task]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/api/todo", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM list");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/api/todo/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM list WHERE id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/api/todo/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {task} = req.body;
        const updateTodo = await pool.query(
            "UPDATE list SET description = $1 WHERE id = $2",
            [task, id]
        );
        res.json({
            message: "Todo was updated!",
        });
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/api/todo/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM list WHERE id = $1", [
            id,
        ]);
        res.json({
            message: "Todo was deleted!",
        });
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});