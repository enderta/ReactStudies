import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {faLeftLong, faLeftRight} from "@fortawesome/free-solid-svg-icons";

const List = () => {
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/budget?search=${search}`)
            .then(response => response.json())
            .then(data => {
                    setSearchData(data);
                }
            )
    }, [search]);
    console.log(searchData);
    return (
        <div>
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
            <div>
                {searchData.data ? (
                    <Table variant={"dark"} bordered>
                        <thead>
                        <tr>
                            <th>Category</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {searchData.data.rows.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.amount}</td>
                                </tr>
                            )
                        }
                        )}
                        </tbody>
                    </Table>)
                    : (<div> No data found</div>)

                }
            </div>
            <Button onClick={()=>{
                window.location.href = '/';}
            }>
                <FontAwesomeIcon icon={faLeftLong}/> Back

            </Button>
        </div>
    );
};

export default List;