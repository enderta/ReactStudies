import React, {useState} from 'react';
import EditModal from "./EditModal";
import Button from "react-bootstrap/Button";

const Edit = (props) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    console.log(props.todo)
    return (
        <div>
            <Button variant={"outline-success"} onClick={handleShow}>Edit</Button>
            <EditModal show={show} handleClose={handleClose} todo={props.todo}/>
        </div>
    );
};

export default Edit;