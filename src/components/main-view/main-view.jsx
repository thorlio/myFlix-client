import { useState, useEffect } from "react";
import { BookCard } from "../book-card/book-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect (() => {
    fetch("https://flixandchill-0e85c940608d.herokuapp.com/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const formattedBooks = data.map((movie) => ({
          id: movie._id,
          title: movie.title,
          image: movie.imageUrl || "image_url", 
          author: movie.director, 
        }));
        setBooks(formattedBooks);
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error);
      });
  }, []);

  if (!user) {
    return <LoginView onLoggedIn={(user) => setUser(user)} />;
  }
  
  if (selectedBook) {
    return (
      <MovieView book={selectedBook} onBackClick={() => setSelectedBook(null)} />
    );
  }

  if (books.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onBookClick={(newSelectedBook) => {
            setSelectedBook(newSelectedBook);
          }}
        />
      ))}
    </div>
  );

};

<button onClick={() => { setUser(null); }}>Logout</button>