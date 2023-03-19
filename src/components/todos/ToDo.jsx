import React, {useEffect, useState} from 'react';
import TodoCards from "./TodoCards";
import "./todo.css"
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import CreateModal from "./CreateModal";
const ToDo = () => {
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:3001/api/todo?page=${page}&search=${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTodos(data.data["todos"]);
                setTotalPages(data.data["pages"]);
                localStorage.setItem("todos", JSON.stringify(data));
            });
    }, [page, search]);
console.log(localStorage.getItem("todos"))
    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            <h1 style={{ color: "white" }}>My To Do List</h1>
            <input
                type="text"
                placeholder="Search"
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1); // Reset page number when search term changes
                }}
            />
            <div>
                <div >
                    <a href={"/create"}>
                        <Button variant="outline-success">
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </a>
                </div>
                <div className="spacer"></div>
            </div>
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
                {
                    <h6 style={{ color: "goldenrod" }}>
                        Page: {page}/{totalPages}
                    </h6>
                }
                <di>
                    {   <h6 style={{ color: "goldenrod" }}>
                      Total Tasks: {localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")).data.total:0}
                    </h6>}
                </di>
                {page < totalPages && (
                    <Button variant={"outline-success"} onClick={handleNextPage}>
                        {">>>"}
                    </Button>

                )}
                {
                    page>1 && (
                        <Button variant={"outline-danger"}  onClick={()=>setPage(page-1)}>
                            {"<<<"}
                        </Button>
                    )
                }

            </div>
        </div>
    );
};
export default ToDo;