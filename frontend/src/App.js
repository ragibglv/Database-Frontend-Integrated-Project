import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './js/Header';
import Tournaments from './js/Tournament';
import TournamentDetails from './js/TournamentDetails';
import Squads from './js/Squads'; // Assuming you have a Squads component
import Matches from './js/Matches'; 
import Teams from './js/Teams';
import Groupstandings from './js/Groupstanding';
import Managers from './js/Managers';

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/tournaments" exact component={Tournaments} />
                <Route path="/tournaments/:id" component={TournamentDetails} />
                <Route path="/squads" exact component={Squads} />
                <Route path="/matches/:match_id?" exact component={Matches} />
                <Route path="/teams" exact component={Teams} />
                <Route path="/groupstandings" exact component={Groupstandings} />
                <Route path="/managers" exact component={Managers} />
            </Switch>
        </Router>
    );
}

export default App;
