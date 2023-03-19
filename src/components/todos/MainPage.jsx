import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import CreateModal from "./CreateModal";

const MainPage = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div>
            <h1>Create New Task</h1>
            <Button variant={"outline-success"} onClick={handleShow}>
                {<CreateModal show={show} handleClose={handleClose}/>}
            </Button>
            <div>
                <a href={"/all"}>View All Tasks</a>
        </div>
        </div>


    );
};

export default MainPage;