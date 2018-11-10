import React, { Component } from 'react';

class Cursor extends Component {
    componentDidMount(){        
        window.addEventListener('mousemove',function(e){
            document.getElementById('cursor').style.left = e.clientX+'px';
            document.getElementById('cursor').style.top = e.clientY+'px';
            
            document.getElementById('x').innerText = e.clientX;
            document.getElementById('y').innerText = e.clientY;
        });
    }
    render(){
        return(
            <div id="cursor-outer">
                <div id="cursor"></div>
                <div id="coordinates">
                    <span id="x"></span>
                    <span id="y"></span>
                </div>
            </div>
        );
    }
}

export default Cursor;