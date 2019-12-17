import React, { useState, useEffect } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner';
import axios from 'axios';

const Movie = (props) => {
  const [movie, setMovie] = useState(null);
 
  useEffect(() => {
    const id = props.match.params.id;

       axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          setMovie(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  },[]);
  
  const saveMovie = props => {
    const addToSavedList = props.addToSavedList;
    addToSavedList(movie)
  }

  if (!movie) {
    return <Loader
              type="Bars"
              color="yellow"
              width={100}
              height={100}
              timeout={3000}  
            />;
  }

  const { title, director, metascore, stars } = movie;
  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div className="save-button" onClick={saveMovie}>Save</div>
    </div>
  );
}

export default Movie;
