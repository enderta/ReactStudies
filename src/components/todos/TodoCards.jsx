import React from 'react';
import Button from "react-bootstrap/Button";
import "./todo.css"
import {Card} from "react-bootstrap";
import Edit from "./Edit";
import Delete from "./Delete";
const TodoCards = (props) => {
    const { id,task, created_at, duedate, priority, status } = props.todo;

    return (
        <Card className={"cards"}>
            <Card.Body>
                <Card.Title>{task}</Card.Title>
                <Card.Text>Created: {new Date(created_at).toLocaleDateString()}</Card.Text>
                <Card.Text>Due: {new Date(duedate).toLocaleDateString()}</Card.Text>
                <Card.Text>Priority: {priority}</Card.Text>
                <Card.Text>Status: {status}</Card.Text>
                    <Edit todo={props.todo} />
                    <Delete todo={props.todo} />
            </Card.Body>
        </Card>
    );
};

export default TodoCards;