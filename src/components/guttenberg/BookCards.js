import React from 'react';
import {Card} from "react-bootstrap";


const BookCards = (props) => {

    return (



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



    );
};

export default BookCards;