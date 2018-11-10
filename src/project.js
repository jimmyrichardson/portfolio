import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TimelineMax } from 'gsap';

/*
 *
 * TODO: Find a way of scrolling down to re-render next project instance
 * TODO: Pass ACF into API
 *
 */

class Project extends Component {
    constructor(props){
        super(props);
        this.state = { projectData: [] }
    }
    componentWillMount(){
        
        //new TimelineMax().to('article',1,{opacity:1})
        
        let getPage = 'http://localhost:8888/wp/wp-json/wp/v2/pages/?_embed&slug='+this.props.location.pathname;
        fetch(getPage)
            .then(result => result.json())
            .then(result => { this.setState({ projectData: result }) })
        
        window.addEventListener('scroll',function(){
            if( window.pageYOffset > 500 ){
                
                console.log(this);
                
                //scrollPush();
            }
        });
        
    }
    /*
    scrollPush(){
        this.props.router.push('/arden-lighting');
    }
    */
    componentWillReceiveProps(nextProps){
        //this.props.location.pathname <- Current data
        //nextProps.location.pathname <- Clicked data
        let getPage = 'http://localhost:8888/wp/wp-json/wp/v2/pages/?_embed&slug='+nextProps.location.pathname;
        fetch(getPage)
            .then(result => result.json())
            .then(result => { this.setState({ projectData: result }) })
    }
    render(){
        let pageContent = this.state.projectData.map((project,index)=>{
            return(
                <article style={{opacity:1}} key={index}>
                    <h2>{project.title.rendered}</h2>
                    <div>
                        <span>01</span>
                        <div dangerouslySetInnerHTML={{ __html: project.content.rendered }} />
                        <p>Up next...</p>
                        <Link to="/b-media">Check</Link>
                    </div>
                </article>
            )
        });
        return(
            <div style={{minHeight:'1000px'}}>
                {pageContent}
            </div>
        );
    }
}

export default Project;
