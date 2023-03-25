import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import './budget.css';
import {wait} from "@testing-library/user-event/dist/utils";
import CategoryDropDown from "./CategoryDropDown";
import Graphics from "./Graphics";


const Budget = () => {
    const [budget, setBudget] = useState([]);
    const [search, setSearch] = useState('');
    const [finance, setFinance] = useState(0);
    const [total, setTotal] = useState(0);
    const [searchData, setSearchData] = useState([]);

    const handleFinance = (e) => {
        setFinance(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    useEffect(() => {
        fetch(`http://localhost:3001/budget?search=${search}`)
            .then(response => response.json())
            .then(data => {
                setSearchData(data);
            }
            )
    }, []);

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
    console.log(budget);
    console.log(searchData);


    return (
        <div>
            <div className='container'>
                <div className='search-container'>
                    <div className='search-input'>
                        <FontAwesomeIcon icon={faSearch} color={'white'}/>
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                    </div>
                    <div className='budget-summary'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Budget</h5>
                                <input
                                    type="number"
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
                    <div className={'chart-container'} style={{backgroundColor: 'goldenrod'}}>
                        <div className='chart'>
                            <div className='chart-title'>
                                <Graphics budget={budget}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Budget;