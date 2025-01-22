import { useState, useEffect } from "react";
import { BookCard } from "../book-card/book-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    if (!token) return;
  
    fetch("https://flixandchill-0e85c940608d.herokuapp.com", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const formattedMovies = data.map((movie) => ({
          id: movie._id,
          title: movie.title,
          image: movie.imageUrl || "image_url", 
          director: movie.director, 
        }));
        setMovies(formattedMovies); 
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error);
      });
  }, [token]); 
  
  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
        or
        <SignupView />
      </>
    );
  }
  
  if (selectedBook) {
    return (
      <MovieView book={selectedBook} onBackClick={() => setSelectedBook(null)} />
    );
  }

  <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>

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

