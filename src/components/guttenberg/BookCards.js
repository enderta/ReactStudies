import React from 'react';
import {Card} from "react-bootstrap";


const BookCards = (props) => {

    return (
        <div>
            <Card className={"cards"}>
                <Card.Title>{props.book.title}</Card.Title>
                <Card.Img variant="top" src={`http://covers.openlibrary.org/b/id/${props.book.cover_i}-M.jpg`} />



                <Card.Body className="d-flex justify-content-between">
                        <Card.Text>
                            {props.book.author_name}

                        </Card.Text>
                        <Card.Text>
                            <a href={`https://openlibrary.org${props.book.key}`} target="_blank">Download</a>
                        </Card.Text>

                </Card.Body>
            </Card>
        </div>
    );
};

export default BookCards;