import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TimelineLite, Expo } from 'gsap';

/*
 *
 * TODO: Featured Image into ACF upnext API object
 *
 */

class Project extends Component {
    constructor(props){
        super(props);
        this.tween = new TimelineLite({paused:true});
        this.state = {projectData:[]}
    }
    componentWillMount(){
        
        let getPage = 'http://localhost:8888/wp/wp-json/wp/v2/pages/?_embed&slug='+this.props.location.pathname;
        fetch(getPage)
            .then(result => result.json())
            .then(result => { this.setState({ projectData: result }) })
            .catch(error => console.error('Error:', error))
        
    }
    componentWillReceiveProps(nextProps){
  
        this.tween
            .set('html',{ overflow: 'hidden' })
            .to('header',0.5,{ opacity: 0 })
            .to('.container',0.5,{ opacity: 0 },'-=0.5')
            .set('.upnext h2',{ position: 'fixed' })
            .set('html',{ scrollTop: 0 })
            .to('.upnext h2',0.4,{ opacity: 0, ease: Expo.easeInOut })
            .play()
        
        let getPage = 'http://localhost:8888/wp/wp-json/wp/v2/pages/?_embed&slug='+nextProps.location.pathname;
        fetch(getPage)
            .then(result => result.json())
            .then(result => { this.setState({ projectData: result }) })
            .then(result => {
                this.tween
                    .set('.upnext h2',{ position: 'absolute', opacity: 0.12 })
                    .to('header',0.5,{ opacity: 1 })
                    .fromTo('article header .meta-title',0.3,{ y: 10, opacity: 0 },{ y: 0, opacity: 1, ease: Expo.easeOut })
                    .fromTo('.meta div',0.3,{ y: 10, opacity: 0 },{ y: 0, opacity: 1, ease: Expo.easeOut },'1.5')
                    .to('.container',0.5,{ opacity: 1 },'-=0.5')
                    .set('html',{ overflow: 'auto' })
            })
            .catch(error => console.error('Error:', error))

    }
    handleScroll =()=> {
        
        var scroll = window.pageYOffset,
            bodyHeight = document.body.clientHeight,
            viewport = window.innerHeight;
        
        if( scroll === bodyHeight - viewport ){   
            this.props.history
                .push(this.state.projectData[0].acf.upnext.post_name)
        }
    }
    upnextpush =()=> {
        this.props.history.push(this.state.projectData[0].acf.upnext.post_name);
    }
    render(){
        
        window.addEventListener('scroll',this.handleScroll);   
        
        let pageContent = this.state.projectData.map((project,index)=>{
            return(
                <article style={{opacity:1}} key={index}>
                    <header>
                        <h2 style={{color: project.acf.color, backgroundImage: 'url('+
                                    project._embedded["wp:featuredmedia"][0]
                                        .media_details
                                        .sizes
                                        .full
                                        .source_url+')' }}>{project.title.rendered}</h2>
                        <span className="meta-title">{project.title.rendered}</span>
                        <div className="meta">
                            <div>
                                <span>Timeline</span><br />
                                <span>{project.acf.timeline}</span>
                            </div>
                            <div>
                                <span>Technologies</span><br />
                                <span>{project.acf.technologies}</span>
                            </div>
                        </div>
                    </header>
                    <div>
                        <div className="container">
                            <div>
                                <span>{project.acf.project_order}</span>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: project.content.rendered }} />
                        </div>
                        <div className="upnext">
                            <p>Up next...</p>
                            <h2 style={{color: project.acf.color}}>{project.acf.upnext.post_title}</h2>
                        </div>
                    </div>
                </article>
            )
        });
        return(
            <div>{pageContent}</div>
        );
    }
}

export default Project;
