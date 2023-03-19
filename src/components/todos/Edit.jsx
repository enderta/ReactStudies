import React, {useState} from 'react';
import EditModal from "./EditModal";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';

const Edit = (props) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div>
            <Button variant={"outline-primary"} onClick={handleShow}>
                <FontAwesomeIcon icon={faEdit} />
            </Button>
            <EditModal show={show} handleClose={handleClose} todo={props.todo}/>
        </div>
    );
};

export default Edit;