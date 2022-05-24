import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default class MovieList extends React.Component {
  state = {
    movies: []
  }

  constructor (props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const newMovie = {
      name: event.target.name.value,
      genre: event.target.genre.value,
      releaseYear: event.target.year.value
    }

    axios.post('/movies', newMovie).then(res => {
      this.setState({ movies: [...this.state.movies, res.data]});
    }).catch((error) => {
      console.log(error);
    });
  };

  getMovies() {
    axios.get('/movies')
      .then(res => {
        const movies = res.data;
        this.setState({ movies });
      }).catch((error) => {
        console.log(error);
      });
  }

  deleteMovie(id) {
    axios.delete(`/movies/${id}`).then(res => {
      this.getMovies();
    }).catch(function (error) {
      console.log(error);
    });;
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <div>
        <div className="new-movie">
          <h2>Add new movie</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="row-movie">
              <label>Name:</label>
              <input type="text" id="name" name="name" required/>
            </div>
            <div className="row-movie">
              <label>Genre:</label>
              <input type="text" id="genre" name="genre" required/>
            </div>
            <div className="row-movie">
              <label>Year:</label>
              <input type="number" id="year" name="year" required/>
            </div>
            <button>Submit</button>
          </form>
        </div>

        <h2>Movies</h2>
        <div className="movie-list">
          { this.state.movies.map(movie => 
            <div key={movie.id}>
              <p>Name: { movie.name }</p>
              <p>Year: { movie.releaseyear }</p>
              <p>
                <button onClick={() => this.deleteMovie(movie.id)}>Delete</button>
                <Link to={`/movie/${movie.id}`}><button>Edit</button></Link>
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
}