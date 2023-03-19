import React from 'react';
import Button from "react-bootstrap/Button";

const Delete = (props) => {
    const handleDelete = () => {
        fetch(`http://localhost:3001/api/todo/${props.todo.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: props.todo.id,
            }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                alert("Deleted")
                window.location.reload();
                console.log(data);
        })
    }

    return (
        <div>
            <Button variant={"outline-danger"} onClick={handleDelete}>Delete</Button>
        </div>
    );
};

export default Delete;