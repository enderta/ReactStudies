import React from 'react';
import {Route, Routes} from "react-router";
import MainPage from "../todos/MainPage";
import ToDo from "../todos/ToDo";
import Create from "../todos/Create";
import Budget from "./Budget";
import List from "./List";

const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Budget/>}/>
                <Route path={"/all"} element={<List/>}/>
            </Routes>
        </div>
    );
};

export default Pages;