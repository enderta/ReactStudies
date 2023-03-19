import React from 'react';
import {Route, Routes} from "react-router";
import MainPage from "./MainPage";
import ToDo from "./ToDo";
import Create from "./Create";

const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<MainPage/>}/>
                <Route path={"/all"} element={<ToDo/>}/>
                <Route path={"/create"} element={<Create/>}/>
            </Routes>

        </div>
    );
};

export default Pages;