import {useEffect, useState} from 'react';
import {Card} from "react-bootstrap";

function Books() {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState('the lord of the rings');
    const [page, setPage] = useState(1);
    const [language, setLanguage] = useState('eng');

    useEffect(() => {
        async function fetchBooks() {
            const response = await fetch(`https://openlibrary.org/search.json?q=${query}&language=${language}`);
            const data = await response.json();
            setBooks(data.docs);
        }
        fetchBooks();
    }, [query]);
    console.log(books);
    function handleSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const query = formData.get('query');
        setQuery(query);
        setPage(1);
    }

    function handleNextPage() {
        setPage(page => page + 1);
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
            <div>
              //grid cards
                {pageBooks.map(book => (
                    <Card key={book.key} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} />
                        <Card.Body>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Text>
                                {book.author_name}
                                //download link open in new tab
                                <a href={`https://openlibrary.org${book.key}`} target="_blank">Download</a>
                            </Card.Text>

                        </Card.Body>
                    </Card>
                ))}
            </div>
            <button onClick={handleNextPage}>Next Page</button>
        </div>
    );
}

export default Books;