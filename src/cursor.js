import React, { Component } from 'react';

class Cursor extends Component {
    componentDidMount(){        
        window.addEventListener('mousemove',function(e){
            document.getElementById('cursor').style.left = e.clientX+'px';
            document.getElementById('cursor').style.top = e.clientY+'px';
        });
    }
    render(){
        return(
            <div id="cursor"></div>
        );
    }
}

export default Cursor;