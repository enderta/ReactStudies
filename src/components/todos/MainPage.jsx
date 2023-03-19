import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import CreateModal from "./CreateModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faReplyAll, faShower, faTasks} from '@fortawesome/free-solid-svg-icons';

const MainPage = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div className="main-container">
            <div className="title">
                <br/>
                <h1 style={{color:"white"}} >My Tasks APP</h1>
            </div>
            <div className="spacer"></div>

            <div className="fab" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className="spacer"></div>
            <div className="view-all">
                <Button variant="outline-warning" href={"/all"}>
                    <FontAwesomeIcon icon={faTasks} /> All Tasks</Button>
            </div>
            <CreateModal show={show} handleClose={handleClose}/>
        </div>
    );
};

export default MainPage;