import { createElement, useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';

const requestPopularURL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
const imageURL = `http://image.tmdb.org/t/p/w500`;
const apiKEY = `&api_key=a0a7e40dc8162ed7e37aa2fc97db5654`;
const searchURL = `https://api.themoviedb.org/3/search/movie?query=`;

const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);
  const [loading, setLoading] = useState(true);
  //const [totalPages, setTotalPages] = useState(0);
  //const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(requestPopularURL + apiKEY)
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setMoviesLoadingError('An error occured while fetching movies.');
        console.error(error);
        setLoading(false);
      });
  }, [movies]);

  return { movies, moviesLoadingError, loading };
};

function ShowMovies(movie) {
  const imagePath = imageURL + movie['poster_path'];
  const pathName = '/movie/' + movie['id'].toString();

  return createElement(
    'li',
    { className: 'flex-item' },
    createElement('img', { className: 'movie-image', src: imagePath }),
    createElement(
      'div',
      { className: 'movie-infos' },
      createElement(
        Link,
        {
          to: {
            pathname: pathName,
          },
          style: { textDecoration: 'none', color: 'white' },
        },
        createElement('p', { className: 'movie-title' }, movie['title']),
      ),
      createElement('span', { className: 'movie-date' }, movie['release_date']),
    ),
  );
}

const useSearchMovie = (movieName) => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchMoviesLoadingError, setSearchMoviesLoadingError] =
    useState(null);
  const [loading, setLoading] = useState(null);

  function fetchMovie(event, search) {
    event.preventDefault();
    if (movieName !== '') {
      axios
        .get(searchURL + search + apiKEY)
        .then((response) => {
          setSearchMovies(response.data.results);
          setLoading(false);
          console.log(searchURL + search + apiKEY);
          response.data.results.map((elt) => console.log(elt));
        })
        .catch((error) => {
          setSearchMoviesLoadingError(
            'An error occured while fetching movies.',
          );
          console.error(error);
          setLoading(false);
        });
    }
  }

  return { searchMovies, searchMoviesLoadingError, loading, fetchMovie };
};

function Home() {
  const [movieName, setMovieName] = useState('');
  const { movies, moviesLoadingError, loading } = useFetchMovies();
  const { searchMovies, searchMoviesLoadingError, searchLoading, fetchMovie } =
    useSearchMovie();
  const [numberSearch, setNumberSearch] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bonjour</h1>
        <form
          className="search-movie"
          onSubmit={(e) => fetchMovie(e, movieName)}
        >
          <input
            type="search"
            placeholder="Search a movie"
            value={movieName}
            onChange={(event) => setMovieName(event.target.value)}
          />
          <button
            type="button"
            className="shadow"
            onClick={(e) => {
              fetchMovie(e, movieName);
              setNumberSearch(numberSearch + 1);
            }}
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
        {numberSearch === 0 ? (
          <div> </div>
        ) : searchLoading === true ? (
          <div> Ca charge ...</div>
        ) : searchMoviesLoadingError !== null ? (
          <div className="movies-loading-error">{searchMoviesLoadingError}</div>
        ) : searchMovies.length === 0 ? (
          <div className="no-result"> No results... Try another keyword</div>
        ) : (
          <ul className="flex-container">
            {searchMovies.map((elt) => ShowMovies(elt))}
          </ul>
        )}
        <h2>Popular Movies</h2>
        {loading === true ? (
          <div> Ca charge ...</div>
        ) : moviesLoadingError !== null ? (
          <div className="movies-loading-error">{moviesLoadingError}</div>
        ) : (
          <ul className="flex-container">
            {movies.map((elt) => ShowMovies(elt))}
          </ul>
        )}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default Home;
