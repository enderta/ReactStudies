import React from 'react';
import {Card, Row} from "react-bootstrap";


const BookCards = (props) => {

    return (
        <div>
            <div className={"container"} >
                <div className={"row"}>
                    <div className={"col-6"}>

                                <Card  key={props.book.key} className="cards" style={{ width: '18rem' }}>
                                    <Card.Img

                                        src={`http://covers.openlibrary.org/b/id/${props.book.cover_i}-M.jpg`}
                                        style={{ height: '300px', objectFit: 'cover' }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{props.book.title}</Card.Title>
                                    </Card.Body>

                                    <Card.Text>{props.book.author_name}</Card.Text>
                                    <a href={`https://openlibrary.org${props.book.key}`} target="_blank">
                                        Download
                                    </a>

                                </Card>

                            </div>
                        </div>
                    </div>
        </div>

    );
};

export default BookCards;