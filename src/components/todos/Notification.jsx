import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
    const [todos, setTodos] = React.useState([]);
    const [msg, setMsg] = React.useState(false);
    useEffect(() => {
        fetch(`http://localhost:3001/api/todo`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTodos(data.data["todos"]);

                const currentTasks = data.data["todos"].filter((todo) => {
                    return new Date(todo.duedate).toLocaleDateString()  === new Date().toLocaleDateString();
                });
                if (currentTasks.length > 0) {
                    setMsg( `You have ${currentTasks.length} task(s) due today!`);
                    toast(msg, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000
                    });
                }
                else {
                    setMsg(`You have no tasks due today!`);
                    toast(msg, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000
                        }
                    );
                }
            });
    }, [msg]);

    return (
        <div>
            {/* Your code here */}
        </div>
    );
};

export default Notification;