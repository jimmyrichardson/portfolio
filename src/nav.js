import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/*
 *
 * TODO: Add all imports
 * TODO: SCSS
 * TODO: Create nav and footer presentational components
 * TODO: Create const for REST path to trickle into all API call routing
 * TODO: Install GSAP
 *
 */

class Nav extends Component {
    constructor(){
        super();
        this.state = {
            pagelist: []
        }
    }
    componentDidMount(){
        let getAllPages = 'http://localhost:8888/wp/wp-json/wp/v2/pages/';
        fetch(getAllPages)
        .then(result => result.json())
        .then(result => {
            this.setState({
                pagelist: result
            })
        })
    }
    render(){
        let navigation = this.state.pagelist.map((page,index)=>{
            return(
                <li key={index}>
                    <Link to={page.slug}>{page.title.rendered}</Link>
                </li>
            )
        });
        return(
            <nav id="nav">
                <Link to='/'>JR.CO</Link>
                <button id="nav-button">:</button>
                <div id="menu"><ul>{navigation}</ul></div>
            </nav>
        );
    }
}

export default Nav;
