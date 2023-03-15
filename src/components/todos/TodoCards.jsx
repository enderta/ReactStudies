import React from 'react';
import Button from "react-bootstrap/Button";

const TodoCards = (props) => {
    return (
        <div>
            <div className="container">
                <div className="card-body">
                    <h5 className="card-title">{props.todo.task}</h5>
                    <p className="card-text">Created: {new Date(props.todo.created_at).toLocaleDateString()}</p>
                    <p className="card-text">Due: {new Date(props.todo.duedate).toLocaleDateString()}</p>
                    <p className="card-text">Priority: {props.todo.priority}</p>
                    <p className="card-text">Status: {props.todo.status}</p>
                </div>
                <Button className={"btn btn-outline-info"}>Edit</Button>
                <Button className={"btn btn-outline-danger"}>Delete</Button>
            </div>
        </div>
    );
};

export default TodoCards;