import React, {useEffect, useState} from 'react';
import TodoCards from "./TodoCards";

const ToDo = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/todo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTodos(data.data["todos"]);
                localStorage.setItem("todos", JSON.stringify(data));
            });
    }, []);

    console.log(localStorage.getItem("todos"));
    console.log(todos);

    return (
        <div>
            <h1 style={{ color: "white" }}>My To Do List</h1>
            <div className="container">
                <div className="row">
                    {todos.map((todo) => {
                        return (
                            <div className="col-md-4">
                                <TodoCards key={todo.id} todo={todo} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default ToDo;