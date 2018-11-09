import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
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
                <Nav />
                    <Route exact path="/" component={Home} />
                    //<Route exact path="/:project" component={Project} />
                <Footer />
            </BrowserRouter>
        );
    }
}

export default App;
