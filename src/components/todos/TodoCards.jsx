import React from 'react';
import "./todo.css"
import {Card} from "react-bootstrap";
import Edit from "./Edit";
import Delete from "./Delete";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TodoCards = (props) => {
    const [task, setTask] = React.useState(props.todo.task);
    const [duedate, setDuedate] = React.useState(props.todo.duedate);
    const [priority, setPriority] = React.useState(props.todo.priority);
    const [status, setStatus] = React.useState(props.todo.status);


    return (
        <Card className={"cards"}>
            <Card.Body className="d-flex justify-content-between">
                <div>
                    <Card.Title>{task}</Card.Title>

                </div>

            </Card.Body>
            <Card.Body className="d-flex justify-content-between">
                <div>
                    <Card.Text>Priority: {priority}</Card.Text>
                    <Card.Text>Status: {status}</Card.Text>
                    <Card.Text>Due: {new Date(duedate).toLocaleDateString()}</Card.Text>
                </div>
            </Card.Body>
            <div className="d-flex justify-content-end">
                <Edit todo={props.todo} />

                <Delete todo={props.todo} />

            </div>
        </Card>

    );
};

export default TodoCards;