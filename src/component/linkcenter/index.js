import React, { Component } from 'react';

class LinkCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        return (
          <>
                    
          <center className="text-primary">
          <br/>
          {this.props.children}
          </center>
          
      </>

        );
    }
}

export default LinkCenter;