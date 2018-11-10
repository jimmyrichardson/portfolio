import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TimelineMax } from 'gsap';

class Home extends Component {
    constructor(){
        super();
        this.state = {homepages:[]}
        this.element = null;
        this.tween = new TimelineMax({paused:true});
    }
    componentWillMount(){
        let getAllPages = 'http://localhost:8888/wp/wp-json/wp/v2/pages?_embed';
        fetch(getAllPages)
        .then(result => result.json())
        .then(result => {
            this.setState({ homepages: result })
        }).then(
            this.tween
                .staggerTo(this.element,1,{ color: 'orange', opacity: 0 },'0.1')
                .play()
            )
    }
    componentDidMount(){
        
        this.tween
                .staggerTo(this.element,1,{ color: 'orange', opacity: 0 },'0.1')
                .play()
        
        new TimelineMax().to( 'section', 1, { opacity: 0.2 } );
        
    }
    render(){
        let homepageArchive = this.state.homepages.map((page,index)=>{
            return(
                <section key={index}>
                    <Link to={page.slug}>
                        <h2>{page.title.rendered}</h2>
                    </Link>
                    <div className="home-bg"
                        style={{
                            backgroundImage:
                                'url('+
                                    page._embedded["wp:featuredmedia"][0]
                                        .media_details
                                        .sizes
                                        .full
                                        .source_url+
                                    ')'
                                }}>
                    </div>
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
