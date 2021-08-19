import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";



// function App() {
//   return (
//     <div>
//    <h1> hello</h1>
//     <Food  />
//    </div>

//   );
// }
class App extends React.Component {

  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    const {
      data: {
        data: { movies }
      } } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({ movies, isLoading:false }); // state,movies : getMovies_movies);

  };

  componentDidMount() {
    this.getMovies();
  }
  render() {
    // react는 render를 refresh하지 않음
    const { isLoading, movies } = this.state

    return (
      <section className="container">
        
          {isLoading
            ? <div className="loader">  
                 <span className="loader_text"> Loading... </span>
              </div>

            : <div className="movies">
              {movies.map(movie => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
                ))}
              </div>
          }
        
      </section>
    
    )
  }
}

export default App;
