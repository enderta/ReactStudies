import React, {useState} from 'react';
import {FormSelect} from "react-bootstrap";

const CategoryDropDown = () => {
    const [category, setCategory] = useState([]);
    const [id, setCategoryID] = useState(0);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        if(e.target.value()==="other"){
            setCategoryID(0);
        }
        else if (e.target.value()==="food"){
            setCategoryID(1);
        }
        else if (e.target.value()==="housing"){
            setCategoryID(2);
        }
        else if (e.target.value()==="transportation"){
            setCategoryID(3);
        }
        else if (e.target.value()==="utilities"){
            setCategoryID(4);
        }
        else if (e.target.value()==="insurance"){
            setCategoryID(5);
        }
        else if (e.target.value()==="medical"){
            setCategoryID(6);
        }
        else if (e.target.value()==="entertainment"){
            setCategoryID(7);
        }
        else if (e.target.value()==="personal"){
            setCategoryID(8);
        }
        else if (e.target.value()==="savings"){
            setCategoryID(9);
        }
        else if (e.target.value()==="debt"){
            setCategoryID(10);
        }
        else{
            setCategoryID(0);
        }
    }



    return (
        <div>
        <FormSelect onChange={handleCategoryChange}>
            <option value="other">Other</option>
            <option value="food">Food</option>
            <option value="housing">Housing</option>
            <option value="transportation">Transportation</option>
            <option value="utilities">Utilities</option>
            <option value="insurance">Insurance</option>
            <option value="medical">Medical</option>
            <option value="entertainment">Entertainment</option>
            <option value="personal">Personal</option>
            <option value="savings">Savings</option>
            <option value="debt">Debt</option>
        </FormSelect>
        </div>
    );
};

export default CategoryDropDown;