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
const PAGE_SIZE = 6;
app.get("/api/todo", async (req, res) => {
    const { page } = req.query;
    const search = req.query.search || "";
    const sort = req.query.sort || "created_at";
    const order = req.query.order || "desc";
    const offset = isNaN(parseInt(page)) ? 0 : (parseInt(page) - 1) * PAGE_SIZE;
    if (!search) {
        try {
            const todos = await pool.query(
                `SELECT * FROM list ORDER BY ${sort} ${order} LIMIT $1 OFFSET $2`,
                [PAGE_SIZE, offset]
            );
            const total = await pool.query("SELECT COUNT(*) FROM list");
            res.status(200).json({
                status: "success",
                data: {
                    todos: todos.rows,
                    total: total.rows[0].count,
                    page: page,
                    pages: Math.ceil(total.rows[0].count / PAGE_SIZE),
                },
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: "Something went wrong" });
        }
    } else {
        try {
            const todos = await pool.query(
                `SELECT * FROM list WHERE task ILIKE $1 OR duedate::text ILIKE $2 OR status ILIKE $3 OR priority ILIKE $4 ORDER BY ${sort} ${order} LIMIT ${PAGE_SIZE} OFFSET ${offset}`,
                [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
            );
            const total = await pool.query(
                `SELECT COUNT(*) FROM list WHERE task ILIKE $1 OR duedate::text ILIKE $2 OR status ILIKE $3 OR priority ILIKE $4`,
                [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
            );
            res.status(200).json({
                status: "success",
                data: {
                    todos: todos.rows,
                    total: total.rows[0].count,
                    page: page,
                    pages: Math.ceil(total.rows[0].count / PAGE_SIZE),
                },
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: "Something went wrong" });
        }
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