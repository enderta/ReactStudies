import logo from './logo.svg';
import './App.css';
import Pages from "./components/todos/Pages";
import ToDo from "./components/todos/ToDo";
import Budget from "./components/budget/Budget";
import {useEffect, useState} from "react";

function App() {

  return (
    <div className="App">
    <Budget />
    </div>
  );
}

export default App;