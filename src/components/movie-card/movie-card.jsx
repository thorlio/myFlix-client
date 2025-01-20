import PropTypes from "prop-types";

export const MovieCard = ({ Movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(Movie);
      }}
    >
      {movie.title}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};