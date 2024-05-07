import React, { useEffect, useState } from 'react';
import './MovieDetails.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const imageURL = `http://image.tmdb.org/t/p/w500`;

/*
function ShowMovies(movie) {
  const imagePath = imageURL + movie['poster_path'];

  return createElement(
    'div',
    { className: 'flex-item-zoom' },
    createElement('img', { className: 'movie-image', src: imagePath }),
    createElement(
      'div',
      { className: 'movie-infos-zoom' },
      createElement('p', { className: 'movie-title-zoom' }, movie['title']),
      createElement(
        'span',
        { className: 'movie-date-zoom' },
        'Titre Original : ',
        movie['original_title'],
        <br />,
      ),
      createElement(
        'span',
        { className: 'movie-date-zoom' },
        'Date de sortie : ',
        movie['release_date'],
        <br />,
      ),
      createElement(
        'span',
        { className: 'movie-overview-zoom' },
        'Résumé : ',
        movie['overview'],
        <br />,
      ),
      createElement(
        'span',
        { className: 'movie-date-zoom' },
        'Langue originale : ',
        movie['original_language'],
        <br />,
      ),
      createElement(
        'span',
        { className: 'movie-date-zoom' },
        'Note Mnne : ',
        movie['vote_average'],
        '/10',
        <br />,
      ),
    ),
  );
}
*/

function MovieDetails() {
  const { id } = useParams();
  console.log(id);
  const [movie, setMovie] = useState([]);
  const imagePath = imageURL + movie['poster_path'];
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=a0a7e40dc8162ed7e37aa2fc97db5654`,
    })
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/users/${id}`)
      .then((response) => {
        setComments(response.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <header className="App-header">
      <div className="flex-item-zoom">
        <img className="movie-image" src={imagePath} alt={movie.title} />
        <div className="movie-infos-zoom">
          <p className="movie-title-zoom">{movie.title}</p>
          <span className="movie-date-zoom">
            <strong>Titre Original :</strong> {movie.original_title} <br />
          </span>
          <span className="movie-date-zoom">
            <strong>Date de sortie :</strong> {movie.release_date} <br />
          </span>
          <span className="movie-overview-zoom">
            <strong>Résumé :</strong> {movie.overview} <br />
          </span>
          <span className="movie-date-zoom">
            <strong>Langue originale :</strong> {movie.original_language} <br />
          </span>
          <span className="movie-date-zoom">
            <strong>Note Moyenne :</strong> {movie.vote_average} / 10 <br />
          </span>
        </div>
      </div>
      <div className="commentaire">
        <h1>Commentaires</h1>
        <div className="com">
          <h4 className="commentateur">Nom d'utilisateur</h4>
          <p className="comment">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            sit amet auctor eros. Etiam porttitor, massa et molestie pretium,
            nibh velit consectetur nunc, vel fringilla ligula nisi a lectus.
            Mauris augue magna, tincidunt quis ligula ac, facilisis semper
            ligula. Curabitur fringilla ullamcorper justo, quis sagittis urna.
            In id nibh nisl. Sed eget molestie velit. In urna nibh, iaculis quis
            vehicula at, blandit vel elit. Fusce ut risus nunc. Curabitur in
            luctus sem. Mauris tincidunt scelerisque dictum. In aliquam
            sollicitudin lorem at vehicula. Mauris magna arcu, iaculis quis
            viverra eu, tincidunt in arcu.{' '}
          </p>
        </div>
        <div className="com">
          <h4 className="commentateur">Nom d'utilisateur</h4>
          <p className="comment">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            sit amet auctor eros. Etiam porttitor, massa et molestie pretium,
            nibh velit consectetur nunc, vel fringilla ligula nisi a lectus.
            Mauris augue magna, tincidunt quis ligula ac, facilisis semper
            ligula. Curabitur fringilla ullamcorper justo, quis sagittis urna.
            In id nibh nisl. Sed eget molestie velit. In urna nibh, iaculis quis
            vehicula at, blandit vel elit. Fusce ut risus nunc. Curabitur in
            luctus sem. Mauris tincidunt scelerisque dictum. In aliquam
            sollicitudin lorem at vehicula. Mauris magna arcu, iaculis quis
            viverra eu, tincidunt in arcu.{' '}
          </p>
        </div>
        <h4 className="ajout-title">Ajouter un commentaire</h4>
        <form className="post-comment">
          <input type='text'></>
        </form>
      </div>
    </header>
  );
}

export default MovieDetails;
