import React, { Component } from 'react';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
       
        return (
          <>
 <div className="content-page">
         <div className="content">
    
          {this.props.children}
      
          </div>
          </div>

      </>

        );
    }
}

export default Content;