import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            homepages: []
        }
    }
    componentDidMount(){
        let getAllPages = 'http://localhost:8888/wp/wp-json/wp/v2/pages/';
        fetch(getAllPages)
        .then(result => result.json())
        .then(result => {
            this.setState({
                homepages: result
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

export default Home;
