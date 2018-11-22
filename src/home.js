import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TimelineLite, Expo } from 'gsap';

class Home extends Component {
    constructor(){
        super();
        this.state = {homepages:[]}
        this.element = null;
        this.tween = new TimelineLite({paused:true});
        this.infinitween = new TimelineLite({repeat:-1,paused:true});
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
                .to('.home-loading',1,{ opacity: 0 },'-=1')
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
                .to('h1',1.25,{ top: '50%', ease: Expo.easeOut })
                .play();
        
            this.infinitween
                .staggerTo('.home-loading span',0.5,{ opacity: 0 },'0.1')
                .staggerTo('.home-loading span',0.5,{ opacity: 1 },'0.1').play()
    }    
    render(){
        let scrollPos = 0;
        var scrollTween = new TimelineLite();
        window.addEventListener('wheel',function(e){
            if( document.querySelector('.home .section-inner') ){
                
                e.deltaY > 0 || e.deltaX > 0 ? _scrolledLeft() : _scrolledRight();
                
                function _scrolledLeft(){
                    scrollPos += 8;
                    console.log(scrollPos);
                    //e.stopPropagation();
                }

                function _scrolledRight(){
                    scrollPos -= 8;
                    //scrollTween.staggerTo('section',0.25,{ x: scrollPos, ease: Expo.easeInOut });
                }

                window.scrollTo(scrollPos,0);

            }
        });
        
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
        
        return(
            
            <div className="home">
                <h1 style={{top:'55%'}}>Jimmy Richardson is a <strong>Creative Technologist</strong> living in Milwaukee, Wisconsin.</h1>
                <p className="home-loading">He has a few projects to show you
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </p>
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
