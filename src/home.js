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
                        e.style.left = -(window.pageXOffset / 8)+'px';
                    });
                });
            }
            
            this.tween
                .to('h1',1,{ opacity: 0.03 })
                .to('section',0.5,{ opacity: 1 })
                .to('.home-bg',1,{ height: '100%', ease: Expo.easeInOut })
                .staggerTo('.home-bg-overlay',0.75,{ height: '0%', ease: Expo.easeInOut },'0.05')
                .to('section h2',0.5,{ opacity: 1, top: '25%', ease: Expo.easeOut },'-=0.25')
                .fromTo('section span',0.5,{ opacity: 0, top: '86.5%' },{ opacity: 1, top: '85%', ease: Expo.easeOut },'-=0.25')
                .play()
        })
    }
    
    componentDidMount(){
            this.tween
                .to('h1',1,{ top: '50%' })
                .play();
    }    
    render(){
        let homepageArchive = this.state.homepages.map((page,index)=>{
            return(
                <section key={index} style={{opacity:0, marginRight: '45px' }}>
                    <Link to={page.slug}>
                        <h2 style={{opacity:0,top:'26.5%'}}>
                            {page.title.rendered}
                        </h2>
                        <span>View Project</span>
                        <div className="home-bg" style={{height:'0%',backgroundColor: ''+ page.acf.color +'' }}>
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
                    </Link>
                </section>
            )
        });
        
        function handleScroll(){
            alert('boi');
        }
        
        return(
            
            <div className="home">
                <h1 style={{top:'55%'}}>Jimmy Richardson is a <strong>Creative Technologist</strong> living in Milwaukee, Wisconsin.</h1>
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
