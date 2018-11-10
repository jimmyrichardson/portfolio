import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            return(
                <section key={index}>
                    <Link to={page.slug}>
                        <h2>{page.title.rendered}</h2>
                    </Link>
                </section>
            )
        });
        
        return(
            <div className="home">
                <h1>Jimmy Richardson is a <strong>Creative Technologist</strong> living in Milwaukee, Wisconsin.</h1>
                {homepageArchive}
            </div>
        );
    }
}

export default Home;
