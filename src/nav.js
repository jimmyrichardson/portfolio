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
            document.getElementById('nav-button')
                .classList.add('nav-hovered');
            //document.getElementById('nav-button').style.right = 'unset';
            document.getElementById('nav-button').style.top = e.clientY+'px';
            document.getElementById('nav-button').style.left = e.clientX+'px';
        });
        
        document.getElementById('nav-button-outer')
            .addEventListener('mouseleave',function(e){     
            document.getElementById('nav-button')
                .classList.remove('nav-hovered');
            document.getElementById('nav-button').style.top = '30px';
            document.getElementById('nav-button').style.left = 'unset';
        });
        
        var toggled = false, that = this;
        
        document.getElementById('nav-button')
            .addEventListener('click',function(){
            
            toggled = !toggled;
            
            if(toggled){
                that.tween
                    .set('#menu',{ visibility: 'visible' })
                    .to('#menu',1,{ opacity: 1 })
                    .play();
            } else {
                that.tween
                    .to('#menu',1,{ opacity: 0 })
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
                <div id="nav-button-outer"></div>
                <button id="nav-button">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div id="menu"><ul>{navigation}</ul></div>
            </nav>
        );
    }
}

export default Nav;
