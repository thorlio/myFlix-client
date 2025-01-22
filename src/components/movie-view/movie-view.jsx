import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) return null;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Genre:</strong> {movie.genre || "N/A"}</p>
      <p><strong>Director:</strong> {movie.director || "N/A"}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};


MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    director: PropTypes.shape({
      name: PropTypes.string,
    }),
    genre: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

