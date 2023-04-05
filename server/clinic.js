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
    database: "clinic",
    password: "ender",
    port: 5432,
});

app.use(bodyParser.json());

app.post('/patients', async (req, res) => {
    try {
        const {name, email, phone, address} = req.body;
        const {rows} = await pool.query('INSERT INTO patients (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, phone, address]);
        res.status(201).json({
                status: "success",
                message: "Patient added",
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

const PAGE_SIZE = 10;

app.get('/patients', async (req, res) => {
    //it should be 10 patients per page
    const {page} = req.query;
    const search = req.query.search || "";
    const sort = req.query.sort || "created_at";
    const order = req.query.order || "desc";
    const offset = isNaN(parseInt(page)) ? 0 : (parseInt(page) - 1) * PAGE_SIZE;
    if (!search) {
        try {
            const patients = await pool.query(
                `SELECT *
                 FROM patients
                 ORDER BY ${sort} ${order} LIMIT $1
                 OFFSET $2`,
                [PAGE_SIZE, offset]
            );
            const total = await pool.query("SELECT COUNT(*) FROM patients");
            res.status(200).json({
                status: "success",
                message: `${total.rows[0].count} patients found`,
                data: {
                    patients: patients.rows,
                    total: total.rows[0].count
                }
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({error: "Something went wrong"});
        }
    } else {
        try {
            const patients = await pool.query(
                `SELECT *
                 FROM patients
                 WHERE name LIKE $1
                 ORDER BY ${sort} ${order} LIMIT $2
                 OFFSET $3`,
                [`%${search}%`, PAGE_SIZE, offset]
            );
            const total = await pool.query(
                `SELECT COUNT(*)
                 FROM patients
                 WHERE name LIKE $1`,
                [`%${search}%`]
            );
            res.status(200).json({
                status: "success",
                message: `${total.rows[0].count} patients found for search term ${search}`,
                data: {
                    patients: patients.rows,
                    total: total.rows[0].count
                }
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({error: "Something went wrong"});
        }
    }
});

app.get('/patients/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {rows} = await pool.query('SELECT * FROM patients WHERE id = $1', [id]);
        res.status(200).json({
            status: "success",
            message: `Patient with id ${id} found`,
            data: {
                rows
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.put('/patients/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, phone, address} = req.body;
        const {rows} = await pool.query('UPDATE patients SET name = $1, email = $2, phone = $3, address = $4 WHERE id = $5 RETURNING *', [name, email, phone, address, id]);
        res.status(200).json({
            status: "success",
            message: `Patient with id ${id} updated`,
            data: {
                rows
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.delete('/patients/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {rows} = await pool.query('DELETE FROM patients WHERE id = $1 RETURNING *', [id]);
        res.status(200).json({
            status: "success",
            message: `Patient with id ${id} deleted`,
            data: {
                rows
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/doctors', async (req, res) => {
    /*id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        specialty VARCHAR(100) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()*/
    try {
        const {first_name, last_name, specialty} = req.body;
        const {rows} = await pool.query('INSERT INTO doctors (first_name, last_name, specialty) VALUES ($1, $2, $3) RETURNING *', [first_name, last_name, specialty]);
        res.status(201).json({
            status: "success",
            message: "Doctor added",
            data: {
                rows
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/doctors', async (req, res) => {
    const {page} = req.query;
    const search = req.query.search || "";
    const sort = req.query.sort || "created_at";
    const order = req.query.order || "desc";
    const offset = isNaN(parseInt(page)) ? 0 : (parseInt(page) - 1) * PAGE_SIZE;
    if (!search) {
        try {
            const doctors = await pool.query(
                `SELECT *
                 FROM doctors
                 ORDER BY ${sort} ${order} LIMIT $1
                 OFFSET $2`,
                [PAGE_SIZE, offset]
            );
            const total = await pool.query("SELECT COUNT(*) FROM doctors");
            res.status(200).json({
                status: "success",
                message: `${total.rows[0].count} doctors found`,
                data: {
                    doctors: doctors.rows,
                    total: total.rows[0].count
                }
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({error: "Something went wrong"});
        }
    } else {
        try {
            const doctors = await pool.query(
                `SELECT *
                 FROM doctors
                 WHERE first_name LIKE $1
                 ORDER BY ${sort} ${order} LIMIT $2
                 OFFSET $3`,
                [`%${search}%`, PAGE_SIZE, offset]
            );
            const total = await pool.query(
                `SELECT COUNT(*)
                 FROM doctors
                 WHERE first_name LIKE $1`,
                [`%${search}%`]
            );
            res.status(200).json({
                status: "success",
                message: `${total.rows[0].count} doctors found for search term ${search}`,
                data: {
                    doctors: doctors.rows,
                    total: total.rows[0].count
                }
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({error: "Something went wrong"});
        }
    }
});

app.get('/doctors/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {rows} = await pool.query('SELECT * FROM doctors WHERE id = $1', [id]);
        res.status(200).json({
            status: "success",
            message: `Doctor with id ${id} found`,
            data: {
                rows
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.put('/doctors/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {first_name, last_name, specialty} = req.body;
        const {rows} = await pool.query('UPDATE doctors SET first_name = $1, last_name = $2, specialty = $3 WHERE id = $4 RETURNING *', [first_name, last_name, specialty, id]);
        res.status(200).json({
            status: "success",
            message: `Doctor with id ${id} updated`,
            data: {
                rows
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.delete('/doctors/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {rows} = await pool.query('DELETE FROM doctors WHERE id = $1 RETURNING *', [id]);
        res.status(200).json({
            status: "success",
            message: `Doctor with id ${id} deleted`,
            data: {
                rows
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/appointments', async (req, res) => {
    /* id SERIAL PRIMARY KEY,
         patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
         doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE,
         start_time TIMESTAMP NOT NULL,
         end_time TIMESTAMP NOT NULL,
         created_at TIMESTAMP NOT NULL DEFAULT NOW(),
         UNIQUE (doctor_id, start_time)*/
    try {
        const {patient_id, doctor_id, start_time, end_time} = req.body;
        const {rows} = await pool.query('INSERT INTO appointments (patient_id, doctor_id, start_time, end_time) VALUES ($1, $2, $3, $4) RETURNING *', [patient_id, doctor_id, start_time, end_time]);
        res.status(201).json({
            status: "success",
            message: "Appointment added",
            data: {
                rows
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/appointments', async (req, res) => {
    const {page} = req.query;
    const search = req.query.search || "";
    const sort = req.query.sort || "created_at";
    const order = req.query.order || "desc";
    const offset = isNaN(parseInt(page)) ? 0 : (parseInt(page) - 1) * PAGE_SIZE;
    if (!search) {
        try {
            const appointments = await pool.query(
                `SELECT *
                 FROM appointments
                 ORDER BY ${sort} ${order} LIMIT $1
                 OFFSET $2`,
                [PAGE_SIZE, offset]
            );
            const total = await pool.query("SELECT COUNT(*) FROM appointments");
            res.status(200).json({
                status: "success",
                message: `${total.rows[0].count} appointments found`,
                data: {
                    appointments: appointments.rows,
                    total: total.rows[0].count
                }
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({error: "Something went wrong"});
        }
    } else {
        try {
            const appointments = await pool.query(
                `SELECT *
                 FROM appointments
                 WHERE patient_id LIKE $1
                 ORDER BY ${sort} ${order} LIMIT $2
                 OFFSET $3`,
                [`%${search}%`, PAGE_SIZE, offset]
            );
            const total = await pool.query(
                `SELECT COUNT(*)
                 FROM appointments
                 WHERE patient_id LIKE $1`,
                [`%${search}%`]
            );
            res.status(200).json({
                status: "success",
                message: `${total.rows[0].count} appointments found for search term ${search}`,
                data: {
                    appointments: appointments.rows,
                    total: total.rows[0].count
                }
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({error: "Something went wrong"});
        }
    }
});

app.get('/appointments/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {rows} = await pool.query('SELECT * FROM appointments WHERE id = $1', [id]);
        res.status(200).json({
            status: "success",
            message: `Appointment with id ${id} found`,
            data: {
                rows
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.put('/appointments/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {patient_id, doctor_id, start_time, end_time} = req.body;
        const {rows} = await pool.query('UPDATE appointments SET patient_id = $1, doctor_id = $2, start_time = $3, end_time = $4 WHERE id = $5 RETURNING *', [patient_id, doctor_id, start_time, end_time, id]);
        res.status(200).json({
            status: "success",
            message: `Appointment with id ${id} updated`,
            data: {
                rows
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.delete('/appointments/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {rows} = await pool.query('DELETE FROM appointments WHERE id = $1 RETURNING *', [id]);
        res.status(200).json({
            status: "success",
            message: `Appointment with id ${id} deleted`,
            data: {
                rows
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(3001, () => {
    console.log('Server started on port 301');
});