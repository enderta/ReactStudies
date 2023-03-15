const express = require("express");
const app = express();
const cors = require('cors');
const { Pool } = require("pg");

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todos",
    password: "ender",
    port: 5432,
});

app.post("/api/todo", async (req, res) => {
    const { task, duedate, status, priority } = req.body;
    try {
        const newTodo = await pool.query(
            "INSERT INTO list (task, duedate, status, priority) VALUES($1, $2, $3, $4) RETURNING *",
            [task, duedate, status, priority]
        );
        res.status(200).json({
            status: "success",
            data: {
                id: newTodo.rows[0].id,
                task: newTodo.rows[0].task,
                duedate: newTodo.rows[0].duedate,
                status: newTodo.rows[0].status,
                priority: newTodo.rows[0].priority,
                created_at: newTodo.rows[0].created_at,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.get("/api/todo", async (req, res) => {
    const search = req.query.search;
    const {task, duedate, status, priority} = req.body;
    try {
        let todos;
        const allTodos = await pool.query("SELECT * FROM list");
        if (allTodos.rows.length === 0) {
            return res.status(404).json({ error: "No todos found" });
        }
        if (!search) {
            todos = await pool.query("SELECT * FROM list");
            res.status(200).json({
                status: "success",
                data: {
                    todos: todos.rows,
                },
            });
        }
        else {
            todos = await pool.query(
                //search by request body
                "SELECT * FROM list WHERE task LIKE $1 OR duedate::text LIKE $2 OR status LIKE $3 OR priority LIKE $4",
                [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]

            );
            res.status(200).json({
                status: "success",
                data: {
                    todos: todos.rows,
                },
            });
        }

    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});
app.get("/api/todo/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await pool.query("SELECT * FROM list WHERE id = $1", [id]);
        if (todo.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json({
            status: "success",
            data: {
                todo: todo.rows[0],
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.put("/api/todo/:id", async (req, res) => {
    const { id } = req.params;
    const { task, duedate, status, priority } = req.body;
    try {
        const updateTodo = await pool.query(
            "UPDATE list SET task = $1, duedate = $2, status = $3, priority = $4 WHERE id = $5",
            [task, duedate, status, priority, id]
        );
        if (updateTodo.rowCount === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json({
            status: "success",
            data: {
                id: id,
                task: task,
                duedate: duedate,
                status: status,
                priority: priority,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.delete("/api/todo/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteTodo = await pool.query("DELETE FROM list WHERE id = $1", [
            id,
        ]);
        if (deleteTodo.rowCount === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json({
            status: "success",
            data: {
                id: id,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});