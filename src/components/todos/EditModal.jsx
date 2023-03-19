import React from 'react';
import {Modal} from "react-bootstrap";

const EditModal = (props) => {
    return (
        <div>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="task">Task</label>
                            <input type="text" className="form-control" id="task" placeholder="Enter task" />
                            <label htmlFor="duedate">Due Date</label>
                            <input type="date" className="form-control" id="duedate" placeholder="Enter due date" />
                            <label htmlFor="priority">Priority</label>
                            <select className="form-control" id="priority">
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                            <label htmlFor="status">Status</label>
                            <select className="form-control" id="status">
                                <option>Not Started</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={props.handleClose}>Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditModal;