import logo from './logo.svg';

import Pages from "./components/budget/Pages";
import ToDo from "./components/todos/ToDo";
import Budget from "./components/budget/Budget";
import {useEffect, useState} from "react";

function App() {

  return (
    <div className="App">
   <Pages/>
    </div>
  );
}

export default App;