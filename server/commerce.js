const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const secret = "secret";

app.use(cors());
app.use(express.json());
pool = new Pool({
user: "postgres",
host: "localhost",
database: "commerce",
password: "ender",
port: 5432,
});

// register user
app.post(
    "/register",
    [
        check("email", "Please include a valid email").isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 }),
        check("name", "Please enter a name").isLength({ min: 1 }),
        check("address", "Please enter an address").isLength({ min: 1 }),
        check("phone", "Please enter a phone number").isLength({ min: 1 }),
        check("is_admin", "Please enter a boolean value").isBoolean(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, name, address, phone, is_admin } = req.body;

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const { rows } = await pool.query(
                "INSERT INTO users (email, password, name, address, phone, is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [email, hashedPassword, name, address, phone, is_admin]
            );
            const token = jwt.sign(
                {
                    user: {
                        id: rows[0].id,
                        email: rows[0].email,
                        name: rows[0].name,
                        address: rows[0].address,
                        phone: rows[0].phone,
                        is_admin: rows[0].is_admin,
                    },
                },
                secret,
                { expiresIn: "1h" }
            );
            res.status(201).json({
                status: "success",
                message: "User created",
                data: {
                    token,
                    is_admin: rows[0].is_admin,
                },
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

// login user
app.post(
    "/login",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const { rows } = await pool.query(
                "SELECT * FROM users WHERE email = $1",
                [email]
            );
            if (rows.length === 0) {
                return res.status(400).json({
                    errors: [{ msg: "Invalid credentials" }],
                });
            }
            const isMatch = await bcrypt.compare(password, rows[0].password);
            if (!isMatch) {
                return res.status(400).json({
                    errors: [{ msg: "Invalid credentials" }],
                });
            }
            const token = jwt.sign(
                {
                    user: {
                        id: rows[0].id,
                        email: rows[0].email,
                        name: rows[0].name,
                        address: rows[0].address,
                        phone: rows[0].phone,
                        is_admin: rows[0].is_admin,
                    },
                },
                secret,
                { expiresIn: "1h" }
            );
            res.status(200).json({
                status: "success",
                message: "User logged in",
                data: {
                    token,
                    is_admin: rows[0].is_admin,
                },
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

//only admin can get all users
//10 users per page
let page=1;
app.get("/users", async (req, res) => {
    jwt.verify(req.headers.authorization, secret, async (error, decoded) => {
        if (error) {
            res.status(401).json({ error: "Unauthorized" });
        } else {
            if (decoded.user.is_admin) {
                const { rows } = await pool.query(
                    "SELECT * FROM users LIMIT 10 OFFSET $1",
                    [(page-1)*10]
                );
                res.status(200).json({
                    status: "success",
                    message: "All users",
                    data: rows,
                });
            } else {
                res.status(401).json({ error: "Unauthorized" });
            }
        }
    }
)});



app.listen(3001, () => {
    console.log("Server started on port 3001");
}
);