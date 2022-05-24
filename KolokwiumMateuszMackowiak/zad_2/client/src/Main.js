import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MovieList from './MovieList';
import MovieForm from './MovieForm';

export default class Main extends React.Component {
    render() {
        return (
            <Switch>
              <Route exact path='/' component={MovieList}></Route>
              <Route exact path='/movie/:id' component={MovieForm}></Route>
            </Switch>
        );
    }
}