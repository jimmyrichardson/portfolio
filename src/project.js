import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TimelineLite, Expo } from 'gsap';

/*
 *
 * TODO: Find a way of scrolling down to re-render next project instance
 * TODO: Pass ACF into API
 *
 */

class Project extends Component {
    constructor(props){
        super(props);
        this.tween = new TimelineLite({paused:true});
        this.state = { projectData: [] }
    }
    componentWillMount(){
        
        let getPage = 'http://localhost:8888/wp/wp-json/wp/v2/pages/?_embed&slug='+this.props.location.pathname;
        fetch(getPage)
            .then(result => result.json())
            .then(result => { this.setState({ projectData: result }) })
            .catch(error => console.error('Error:', error))
        
    }
    componentWillReceiveProps(nextProps){
        
        //this.props.location.pathname <- Current data
        //nextProps.location.pathname <- Clicked data
        
        let getPage = 'http://localhost:8888/wp/wp-json/wp/v2/pages/?_embed&slug='+nextProps.location.pathname;
        fetch(getPage)
            .then(result => result.json())
            .then(result => { this.setState({ projectData: result }) })
            .catch(error => console.error('Error:', error))

    }
    handleScroll =()=> {
        
        console.log( window.pageYOffset );
        console.log( document.body.style.height );
        console.log( window.innerHeight );
        
        /*
        this.tween
            .to('article header',0.025,{x:-(window.pageYOffset/2)})
            .to('article h2',0.025,{backgroundPosition:(window.pageYOffset/2)+'px 50%'})
            .play()
        */
        
        /*
        if( window.pageYOffset > 150 ){
            this.tween
                .to('html',1.25,{ scrollTop: 0, ease: Expo.easeInOut })
                .call(
                    this.props.
                    history.push(
                        this.state.projectData[0].acf.upnext.post_name
                    )
                )
        }
        */
    }
    render(){
        
        //console.log(this.state.projectData[0].title.rendered);
        //document.title = this.state.projectData.title.rendered;
        
        window.addEventListener('scroll',this.handleScroll);   
        
        let pageContent = this.state.projectData.map((project,index)=>{
            return(
                <article style={{opacity:1}} key={index}>
                    <header>
                        <h2 style={{backgroundImage: 'url('+
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
                        <p>Up next...</p>
                        <h2>{project.acf.upnext.post_title}</h2>
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
