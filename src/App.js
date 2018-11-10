import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import Home from './home';
import Project from './project';
import './App.css';

/*
 *
 * TODO: Add all imports
 * TODO: SCSS
 * TODO: Create nav and footer presentational components
 * TODO: Create const for REST path to trickle into all API call routing
 * TODO: Install GSAP
 *
 */

class App extends Component {
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/:project" component={Project} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
