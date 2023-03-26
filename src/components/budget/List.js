import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";

const List = () => {
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);

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
        </div>
    );
};

export default List;