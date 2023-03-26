import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import './budget.css';
import {wait} from "@testing-library/user-event/dist/utils";
import CategoryDropDown from "./CategoryDropDown";
import Graphics from "./Graphics";
import {faPlus, faTasks} from "@fortawesome/free-solid-svg-icons";
import AddExpense from "./AddExpense";
import Button from "react-bootstrap/Button";


const Budget = () => {
    const [budget, setBudget] = useState([]);

    const [finance, setFinance] = useState(0);
    const [total, setTotal] = useState(0);


    const handleFinance = (e) => {
        setFinance(e.target.value);
    }


    useEffect(() => {
        fetch('http://localhost:3001/budget')
            .then(response => response.json())
            .then(data => {
                setBudget(data);
                let total = 0;
                data.data.rows.forEach(item => {
                    total += Number(item.amount);
                })
                setTotal(total);
            })
    }, []);

    return (
        <div>
            <div>
                    <div className={"container"} >
                        <div >
                            <div style={{margin:"10px"}}>
                                <Button variant="outline-warning" href={"/all"}>
                                    <FontAwesomeIcon icon={faTasks}/> List of Expenses</Button>
                            </div>
                        <div className='budget-summary'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='card-title'>Income</h5>
                                    <input
                                        type="money"
                                        className='card-text'
                                        placeholder="0"
                                        onChange={handleFinance}
                                    />
                                </div>
                            </div>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='card-title'>Remaining</h5>
                                    <p className='card-text'>
                                        {
                                            finance - total
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='card-title'>Total Spent</h5>
                                    <p className='card-text'>
                                        {
                                            total
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='container'>
                        <div className='chart-container' style={{backgroundColor: 'goldenrod'}}>
                            <div className='chart'>
                                <div className='chart-title'>
                                    <Graphics budget={budget}/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <div className='container'>
                    <div style={{margin: "20px", padding: "20px"}}>
                        <div className='d-flex justify-content-center'>
                            <div className='add-expense'>
                                <div>
                                    <AddExpense/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Budget;