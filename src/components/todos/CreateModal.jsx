import React, {useState} from 'react';
import {Form, FormSelect, Modal} from "react-bootstrap";

const CreateModal = (props) => {
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
                alert("Task created successfully");
               window.location.href = "/all";
                console.log(data);

            })
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

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <Form>
                        <Form.Group>
                            <Form.Label>Task</Form.Label>
                            <Form.Control type="text" name="task" placeholder="Enter task" onChange={handleChanges}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="date" name="duedate" placeholder="Enter due date"
                                          onChange={handleChanges}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Priority</Form.Label>
                            <FormSelect name="priority" onChange={handleChanges}>
                                <option>Choose...</option>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </FormSelect>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <FormSelect name="status" onChange={handleChanges}>
                                <option>Choose...</option>
                                <option>Not Started</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </FormSelect>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={props.handleClose}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateModal;