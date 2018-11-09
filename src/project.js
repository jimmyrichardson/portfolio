import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

/*
 *
 * TODO: Pass props.route into this to populate per page
 * TODO: Find a way of scrolling down to re-render next project instance
 * TODO: Pass ACF into API
 *
 */

class Project extends Component {
    constructor(){
        super();
        this.state = {
            projectData: []
        }
    }
    componentDidMount(){
        let getAllPages = 'http://localhost:8888/wp/wp-json/wp/v2/pages/';
        fetch(getAllPages)
        .then(result => result.json())
        .then(result => {
            this.setState({
                projectData: result
            })
        })
    }
    render(){
        let homepageArchive = this.state.homepages.map((page,index)=>{
            return <div key={index}>
                        <Link to={page.slug}>
                            <h2>{page.title.rendered}</h2>
                        </Link>
                    </div>
        });
        
        return(
            <div className="home">
                {homepageArchive}
            </div>
        );
    }
}

export default Project;
