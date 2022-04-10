import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import PropTypes from 'prop-types';

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const {movieId} = useParams();

  async function getMovie(movieId){
    const rep = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`);
    const json = await rep.json();
    setMovie(json.data.movie);
    setLoading(false);
  }

  useEffect(() => {
    getMovie(movieId);
  }, [])

  return (
    <div>
      {loading ? 
        (
          <h1>Loading...</h1> 
        ) : (
          <div>
            <img src={movie.medium_cover_image} />
            <h1>{movie.title_long}</h1>
            <p>다운로드 수  : {movie.download_count}</p>
            <h3>작품설명</h3>
            <p>{movie.description_full}</p>
          </div>
        )
      }
      <Link to="/">뒤로가기</Link>
    </div>
  )
}

export default Detail;