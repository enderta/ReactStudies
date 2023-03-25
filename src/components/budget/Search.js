import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";

const Search = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }
    useEffect(() => {
        fetch(`http://localhost:3001/budget?search=${search}`)
            .then(response => response.json())
            .then(data => {
                setData(data);

            }
            )
    }, []);
    console.log(data);

    return (
        <div>
            <div className='container'>
                <div className='search-container'>
                    <div className='search-input'>
                        <FontAwesomeIcon icon={faSearch} color={'white'}/>
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Search;