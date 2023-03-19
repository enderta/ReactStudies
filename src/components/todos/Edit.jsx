import React, {useState} from 'react';
import EditModal from "./EditModal";
import Button from "react-bootstrap/Button";

const Edit = (props) => {
    const [task, setTask] = useState(props.todo.task);
    const [duedate, setDuedate] = useState(props.todo.duedate);
    const [priority, setPriority] = useState(props.todo.priority);
    const [status, setStatus] = useState(props.todo.status);
    const [show, setShow] = useState(false);



    const handleEdit = () => {
        fetch(`http://localhost:3001/api/todo/${props.todo.id}`, {
            method: "PUT",
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
                console.log(data);

        })

    }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div>
            <Button variant={"outline-success"} onClick={handleShow}>Edit</Button>
            <EditModal show={show} handleClose={handleClose} todo={props.todo} handleEdit={handleEdit}/>
        </div>
    );
};

export default Edit;