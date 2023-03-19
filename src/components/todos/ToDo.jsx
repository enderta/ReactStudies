import React, {useEffect, useState} from 'react';
import TodoCards from "./TodoCards";
import "./todo.css"
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import CreateModal from "./CreateModal";
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
const ToDo = () => {
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [show, setShow] = useState(false);

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

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);
    const handleBack = () => {
        window.location.href = "/";
    }
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <div>
                        <Button variant="outline-success" onClick={handleShow}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                        <CreateModal show={show} handleClose={handleClose}/>
                    </div>
                </div>
                <div>
                    <FontAwesomeIcon icon={faSearch} color={'white'} />
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1); // Reset page number when search term changes
                        }}
                    />
                </div>


            </div>

            <div className="spacer"></div>
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
                        <FontAwesomeIcon icon={faAngleRight} /> Next
                    </Button>

                )}
                {
                    page>1 && (
                        <Button variant={"outline-danger"}  onClick={()=>setPage(page-1)}>
                            <FontAwesomeIcon icon={faAngleLeft} /> Prev
                        </Button>
                    )
                }

            </div>
            <div className="spacer">
                <Button variant={"outline-danger"} onClick={handleBack}>
                    <FontAwesomeIcon icon={faHome} />
                </Button>
            </div>
        </div>
    );
};
export default ToDo;