import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TimelineLite, Expo } from 'gsap';

class Home extends Component {
    constructor(){
        super();
        this.state = {homepages:[]}
        this.element = null;
        this.tween = new TimelineLite({paused:true});
    }
    componentWillMount(){
        let getAllPages = 'http://localhost:8888/wp/wp-json/wp/v2/pages?_embed';
        fetch(getAllPages)
        .then(result => result.json())
        .then(result => {
            this.setState({ homepages: result })
        }).then(result => {
            
            function resizeWidth(){
                var innerWidth = 1;
                if( document.querySelector('.section-inner') ){
                    [].forEach.call(document.querySelectorAll('section'),function(e){
                        innerWidth += (e.offsetWidth + 45);
                    });
                    document.querySelector('.section-inner').style.width = innerWidth+'px';
                }
            }
            resizeWidth();
            window.addEventListener('resize',resizeWidth);
            
            if(document.querySelector('.section-inner')){
                window.addEventListener('scroll',function(){
                    [].forEach.call(document.querySelectorAll('.home-bg-image-inner'),function(e){
                        e.style.left = -(window.pageXOffset / 5)+'px';
                    });
               });
            }
            
            this.tween
                .to('h1',1,{ opacity: 0.03 })
                .to('section',0.5,{ opacity: 1 })
                .to('.home-bg',0.35,{ width: '80%' })
                .to('.home-bg',0.35,{ height: '100%' })
                .to('.home-bg-overlay',1,{ height: '0%', ease: Expo.easeInOut })
                .to('section h2',0.5,{ opacity: 1, top: '25%', ease: Expo.easeOut },'-=0.25')
                .play()
        })
    }
    render(){
        let homepageArchive = this.state.homepages.map((page,index)=>{
            return(
                <section key={index} style={{opacity:0, marginRight: '45px' }}>
                    <Link to={page.slug}>
                        <h2 style={{opacity:0,top:'26.5%'}}>{page.title.rendered}</h2>
                    </Link>
                    <div className="home-bg" style={{width:'1%',height:'1%'}}>
                        <div className="home-bg-image">
                            <div className="home-bg-image-inner"
                            style={{backgroundImage:
                                'url('+
                                    page._embedded["wp:featuredmedia"][0]
                                        .media_details
                                        .sizes
                                        .full
                                        .source_url+
                                    ')'
                                }}></div>
                        </div>
                        <div className="home-bg-overlay"></div>
                    </div>
                </section>
            )
        });
        return(
            <div className="home">
                <h1>Jimmy Richardson is a <strong>Creative Technologist</strong> living in Milwaukee, Wisconsin.</h1>
                <div className="section-outer">
                    <div className="section-inner">
                        {homepageArchive}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
