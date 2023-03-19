import React from 'react';
import {Form, FormSelect, Modal} from "react-bootstrap";

const EditModal = (props) => {
    const handleChanges = (e) => {
        e.preventDefault();
        if (e.target.name === "task") {
            props.todo.setTask(e.target.value);
        }
        if (e.target.name === "duedate") {
            props.setDuedate(e.target.value);
        }
        if (e.target.name === "priority") {
            props.setPriority(e.target.value);
        }
        if (e.target.name === "status") {
            props.setStatus(e.target.value);
        }
    }
    const handleSubmit = () => {
        fetch("http://localhost:3001/api/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    task: props.todo.task,
                    duedate: props.todo.duedate,
                    priority: props.todo.priority,
                    status: props.todo.status,
                }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

            })
    }

    return (
        <div>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
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

export default EditModal;