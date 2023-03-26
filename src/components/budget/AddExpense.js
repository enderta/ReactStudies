import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import CreateModal from "../todos/CreateModal";
import {FormSelect, Modal} from "react-bootstrap";
import CategoryDropDown from "./CategoryDropDown";

const AddExpense = () => {
    const [show, setShow] = React.useState(false);
    const [description, setDescription] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [category_id, setCategory_id] = React.useState('');

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleChanges = (e) => {
        e.preventDefault();
        if (e.target.name === 'description') {
            setDescription(e.target.value);
        }
        if (e.target.name === 'amount') {
            setAmount(e.target.value);
        }
        if (e.target.name === 'category_id') {
            setCategory_id(e.target.value);
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            description: description,
            amount: amount,
            category_id: category_id
        }
        fetch('http://localhost:3001/budget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch((error) => {
                    console.error('Error:', error);
                }
            );
        window.location.reload();
    }

    return (
        <div>
            <div>
                <div className={"plus"} onClick={handleShow}>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Expense</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={handleChanges}
                                />
                                <div className="form-group">
                                    <label htmlFor="amount">Amount</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="amount"
                                        name="amount"
                                        value={Number(amount)}
                                        onChange={handleChanges}
                                    />
                                    <div className="form-group">
                                        <label htmlFor="category_id">Category</label>
                                        <FormSelect name={"category_id"} onChange={handleChanges}>
                                            <option value={1}>Other</option>
                                            <option value={2}>Food</option>
                                            <option value={3}>Housing</option>
                                            <option value={4}>Transportation</option>
                                            <option value={5}>Utilities</option>
                                            <option value={6}>Insurance</option>
                                            <option value={7}>Medical</option>
                                            <option value={8}>Personal</option>
                                            <option value={9}>Debt</option>
                                            <option value={10}>Savings</option>
                                            <option value={11}>Entertainment</option>
                                            <option value={12}>Clothing</option>
                                            <option value={13}>Gifts</option>
                                            <option value={14}>Education</option>
                                            <option value={15}>Taxes</option>
                                            <option value={16}>Miscellaneous</option>
                                        </FormSelect>
                                    </div>
                                </div>
                            </div>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div>

        </div>
    );
};

export default AddExpense;