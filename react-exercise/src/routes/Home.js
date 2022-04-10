import { useState, useEffect } from "react";
import LoadMovies from '../components/LoadMovies.js';

function Home(){
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async() => {
    const rep = await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`);
    const json = await rep.json();
    setMovies(json.data.movies);
    setLoading(false); 
  }

  useEffect(() => {
    getMovies();
  }, []);

  console.log(movies);  
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : ( 
        <div>
          {movies.map((movie) => (
            <LoadMovies 
              key={movie.id} 
              id={movie.id} 
              coverImg={movie.medium_cover_image} 
              title={movie.title} 
              summary={movie.summary} 
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home;