import React from 'react';

import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import { useHistory } from "react-router-dom";

export default class MovieForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
     }

    handleSubmit(event) {
        event.preventDefault();

        const newMovie = {
            name: event.target.name.value,
            genre: event.target.genre.value,
            releaseYear: event.target.releaseYear.value
        }

        axios.put(`/movies/${this.state.movie.id}`, newMovie).then(res => {
            window.location = "/";
        }).catch(function (error) {
            console.log(error);
          });
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get(`/movies/${id}`).then(res => {
            const movie = res.data;
            this.setState({ movie });
      }).catch(function (error) {
        console.log(error);
      });
    }

    render() {
        return (
            <div>
                <div className="movie-header">
                    <h2>Movie</h2>
                    <Link to="/">Back</Link>
                </div>
                
                <div className="movie-details">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row-movie">
                          <label>Name:</label>
                          <input type="text" name="name" defaultValue={this.state.movie.name} required/>
                        </div>
                        <div className="row-movie">
                          <label>Genre:</label>
                          <input type="text" name="genre" defaultValue={this.state.movie.genre} required/>
                        </div>
                        <div className="row-movie">
                          <label>Year:</label>
                          <input type="number" name="releaseYear" defaultValue={this.state.movie.releaseyear} required/>
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}