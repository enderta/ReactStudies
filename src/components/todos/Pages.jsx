import React from 'react';
import {Route, Routes} from "react-router";
import MainPage from "./MainPage";
import ToDo from "./ToDo";

const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<MainPage/>}/>
                <Route path={"/all"} element={<ToDo/>}/>
            </Routes>

        </div>
    );
};

export default Pages;