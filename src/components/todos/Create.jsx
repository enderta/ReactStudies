import React, {useState} from 'react';
import {Form, FormSelect} from "react-bootstrap";
import {toast} from "react-toastify";

const Create = () => {
    const [task, setTask] = useState();
    const [duedate, setDuedate] = useState();
    const [priority, setPriority] = useState();
    const [status, setStatus] = useState();


    const handleSubmit = () => {
        fetch("http://localhost:3001/api/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    task: task,
                    duedate: duedate,
                    priority: priority,
                    status: status,
                }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
               toast("Task created successfully", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000
               });
                window.location.href = "/all";
                console.log(data);

            })
    }
    const handleBack = (e) => {
        e.preventDefault()
        window.location.href = "/all";
    }
    const handleChanges = (e) => {
        e.preventDefault();
        if (e.target.name === "task") {
            setTask(e.target.value);
        }
        if (e.target.name === "duedate") {
            setDuedate(e.target.value);
        }
        if (e.target.name === "priority") {
            setPriority(e.target.value);
        }
        if (e.target.name === "status") {
            setStatus(e.target.value);
        }

    }
    return (
        <div>
            <div>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Create Task</h3>
                                </div>
                                <div className="card-body">
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Task</Form.Label>
                                            <Form.Control type="text" name="task" placeholder="Enter task" onChange={handleChanges}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Due Date</Form.Label>
                                            <Form.Control type="date" name="duedate" placeholder="Enter due date" onChange={handleChanges}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Priority</Form.Label>
                                            <FormSelect name="priority" onChange={handleChanges}>
                                                <option value="high">High</option>
                                                <option value="medium">Medium</option>
                                                <option value="low">Low</option>
                                            </FormSelect>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Status</Form.Label>
                                            <FormSelect name="status" onChange={handleChanges}>
                                                <option value="pending">Pending</option>
                                                <option value="completed">Completed</option>
                                            </FormSelect>
                                        </Form.Group>
                                        <button className="btn btn-primary" onClick={handleSubmit}>Create</button>
                                        <button className="btn btn-primary" onClick={handleBack}>Back</button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;