import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import CreateModal from "../todos/CreateModal";

const AddExpense = () => {
    const [show, setShow] = React.useState(false);
    function handleShow() {
        setShow(true);
    }

    let handleClose = () => setShow(false);
    return (
        <div>
            <div >  <div className={"plus"} onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} />
            </div></div>

        </div>
    );
};

export default AddExpense;