import { useEffect, useState } from 'react';
import { Card, Button, CardGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";

function Books() {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState('the lord of the rings');
    const [page, setPage] = useState(1);
    const [language, setLanguage] = useState('eng');

    useEffect(() => {
        async function fetchBooks() {
            const response = await fetch(
                `https://openlibrary.org/search.json?q=${query}&language=${language}`
            );
            const data = await response.json();
            setBooks(data.docs);
        }
        fetchBooks();
    }, [query, language]);

    function handleSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const query = formData.get('query');
        setQuery(query);
        setPage(1);
    }

    function handleNextPage() {
        setPage((page) => page + 1);
    }

    const booksPerPage = 6;
    const startIndex = (page - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const pageBooks = books.slice(startIndex, endIndex);

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" name="query" />
                <button type="submit">Search</button>
            </form>
            <CardGroup>
                {pageBooks.map((book) => (
                    <Card key={book.key}>
                        <Card.Img variant="top" src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} />
                        <Card.Body>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Text>{book.author_name}</Card.Text>
                            <Button variant="primary" href={`https://openlibrary.org${book.key}`} target="_blank">
                                Download
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </CardGroup>
            <Button variant="primary" onClick={() => setPage((page) => {
                //on the last page, the next page will be the same as the current page
                if (page < Math.ceil(books.length / booksPerPage)) {
                    return page + 1;
                }
                else {
                    alert('You are on the last page');
                    return page;
                }


            })}>
               <FontAwesomeIcon icon={faArrowRight} color={'white'}/>
            </Button>
            <Button variant="primary" onClick={() => setPage((page) => 1)}>
                <FontAwesomeIcon icon={faHome} color={'white'}/>
            </Button>
            <Button variant="primary" onClick={() => setPage((page) => {
                if (page > 1) {
                    return page - 1;
                } else {
                    return page;
                }
            })}>
                <FontAwesomeIcon icon={faArrowLeft} color={'white'}/>
            </Button>


        </div>
    );
}

export default Books;