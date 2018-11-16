import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TimelineLite } from 'gsap';

/*
 *
 * TODO: Create const for REST path to trickle into all API call routing
 *
 */

class Nav extends Component {
    constructor(){
        super();
        this.state = {pagelist:[]}
        this.tween = new TimelineLite({paused:true});
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
        
        document.getElementById('nav-button-outer')
            .addEventListener('mousemove',function(e){
            
            document.getElementById('cursor').classList.add('nav-hovered');
            
            document.getElementById('nav-button').style.transition = 'all .1s';
            document.getElementById('nav-button').style.top = e.clientY +'px';
            document.getElementById('nav-button').style.left = e.clientX +'px';
            
        });
        document.getElementById('nav-button-outer')
            .addEventListener('mouseleave',function(e){
            
            document.getElementById('cursor').classList.remove('nav-hovered');
            
            document.getElementById('nav-button').style.transition = 'all .5s';
            document.getElementById('nav-button').style.top = '50px';
            document.getElementById('nav-button').style.left = (window.innerWidth - 50)+'px';
            
        });
        
        window.addEventListener('resize',function(){
            document.getElementById('nav-button')
                .style.left = (window.innerWidth - 50)+'px';
        });
        
        var toggled = false, that = this;
        
        document.getElementById('nav-button-outer')
            .addEventListener('click',function(){
            
            document.body.classList.toggle('nav-opened');
            
            toggled = !toggled;
            
            if(toggled){
                that.tween
                    .set('#menu',{ visibility: 'visible' })
                    .to('#menu',0.4,{ opacity: 1 })
                    .play();
            } else {
                that.tween
                    .to('#menu',0.4,{ opacity: 0 })
                    .set('#menu',{ visibility: 'hidden' })
                    .play();
            }
            
        });
        
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
                <Link id="logo" to='/'>JR.CO</Link>
                <div id="nav-outer"></div>
                <div id="nav-button-outer"></div>
                <button id="nav-button">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div id="menu">
                    <div className="nav-main">
                        <h2>Jimmy Richardson</h2>
                        <div>
                            <p>Creative Technologist a.k.a. web development and graphic design hybrid. Specialties in UI design and creative front end. I handled most design and all development of every project you see here.</p>
                            <p>For all inquiries:</p>
                            <a href="mailto:jlrichii@gmail.com">jlrichii@gmail.com</a>
                        </div>
                    </div>
                    <ul className="page-list">{navigation}</ul>
                </div>
            </nav>
        );
    }
}

export default Nav;
