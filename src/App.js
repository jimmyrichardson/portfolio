import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import Home from './home';
import Project from './project';
import Cursor from './cursor';
import { TimelineLite } from 'gsap';
import './css/app.css';

/*
 *
 * TODO: Create const for REST path to trickle into all API call routing
 *
 */

class App extends Component {
    componentDidMount(){
        new TimelineLite({delay:0.75})
                .to('#root-inner',1,{opacity:1})
                .fromTo('#nav',0.3,{y:-30,opacity:0},{y:0,opacity:1});
    }
    render(){
        return(
            <BrowserRouter>
                <div id="root-inner" style={{opacity:0}}>
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/:project" component={Project} />
                    </Switch>
                    <Cursor />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
