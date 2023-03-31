import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';

const BookCards = ({ books }) => {
    return (
        <CardGroup  >
            {books.map((book) => (
                <Card key={book.key} className="cards" style={{margin:"5px",background:"goldenrod"}}>
                    {book.cover_i && (
                        <Card.Img
                            src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                        />
                    )}
                    <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        {book.author_name && (
                            <Card.Text>{book.author_name.join(', ')}</Card.Text>
                        )}
                        <a href={`https://openlibrary.org${book.key}`} target="_blank">
                            Download
                        </a>
                    </Card.Body>
                </Card>
            ))}
        </CardGroup>
    );
};

export default BookCards;