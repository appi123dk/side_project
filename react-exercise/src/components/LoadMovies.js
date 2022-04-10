import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


function LoadMovies({id, coverImg, title, summary, genres}){
  return (
    <div>
      <img src={coverImg}/>
      <h2>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <p>{summary}</p>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

LoadMovies.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.number.isRequired
}

export default LoadMovies;