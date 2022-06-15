import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import AnimeList from './ui/animes/AnimeList';

import Dashboard from './ui/dashboard/Dashboard';
import AnimeDetails from './ui/animes/AnimeDetails';

import VoiceActorList from './ui/voiceActors/VoiceActorList';
import VoiceActorDetails from './ui/voiceActors/VoiceActorDetails';
import AnimeAdd from './ui/animes/AnimeAdd';
import AnimeEdit from './ui/animes/AnimeEdit';
import VoiceActorAdd from './ui/voiceActors/VoiceActorAdd';
import VoiceActorEdit from './ui/voiceActors/VoiceActorEdit';
import CommentList from './ui/redis/CommentList';

function App() {
  return (
    <div className="App">
      <Router>
            <div>
              <h3>Menu</h3>
              <div className="LinkDiv">
                <Link to="/" className="Link">Dashboard</Link>
              </div>
              <div className="LinkDiv">
                <Link to="/redis" className="Link">Redis Comment List</Link>
              </div>
              <div className="LinkDiv">
                <Link to="/animes" className="Link">Mongo Anime List</Link>
              </div>
              <div className="LinkDiv">
                <Link to={`/animes/add`} className="Link">Mongo Add Anime</Link>
              </div>
              <div className="LinkDiv">
                <Link to="/voiceActors" className="Link">Mongo VoiceActor List</Link>
              </div>
              <div className="LinkDiv">
                <Link to={`/voiceActors/add`} className="Link">Mongo Add Voice Actor</Link>
              </div>
            </div>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/redis" component={CommentList} />
          <Route exact path="/animes" component={AnimeList} />
          <Route exact path="/animes/add" component={AnimeAdd} />
          <Route exact path="/animes/edit/:id" component={AnimeEdit} />
          <Route exact path="/animes/details/:id" component={AnimeDetails} />
          <Route exact path="/voiceActors" component={VoiceActorList} />
          <Route exact path="/voiceActors/add" component={VoiceActorAdd} />
          <Route exact path="/voiceActors/edit/:id" component={VoiceActorEdit} />
          <Route exact path="/voiceActors/details/:id" component={VoiceActorDetails} />
        </Switch>
    </Router>
    </div>
  );
}

export default App;
/*
<div className="App">
      <Router>
            <div>
              <div className="LinkDiv">
                <Link to="/" className="Link">Dashboard</Link>
              </div>
              <div className="LinkDiv">
                <Link to="/animes" className="Link">Anime List</Link>
              </div>
              <div className="LinkDiv">
                <Link to="/voiceActors" className="Link">VoiceActor List</Link>
              </div>
            </div>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/animes" component={AnimeList} />
          <Route exact path="/animes/:id" component={AnimeDetails} />
          <Route exact path="/voiceActors" component={VoiceActorList} />
          <Route exact path="/voiceActors/:id" component={VoiceActorDetails} />
        </Switch>
    </Router>
    </div>
*/
