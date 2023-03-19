import React from 'react';
import "./todo.css"
import {Card} from "react-bootstrap";
import Edit from "./Edit";
import Delete from "./Delete";
const TodoCards = (props) => {
   const [task, setTask] = React.useState(props.todo.task);
    const [duedate, setDuedate] = React.useState(props.todo.duedate);
    const [priority, setPriority] = React.useState(props.todo.priority);
    const [status, setStatus] = React.useState(props.todo.status);


    return (
        <Card className={"cards"}>
            <Card.Body>
                <Card.Title>{task}</Card.Title>
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