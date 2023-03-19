import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import CreateModal from "./CreateModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const MainPage = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div className="main-container">

            <div className="fab" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className="spacer"></div>
            <div className="view-all">
                <Button variant="outline-warning" href={"/all"}>View All Tasks</Button>
            </div>
            <CreateModal show={show} handleClose={handleClose}/>
        </div>
    );
};

export default MainPage;