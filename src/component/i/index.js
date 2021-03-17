import React, { Component } from 'react';

class Italic extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        const { className} = this.props
        return (
          <>

          <i className={className}/>
          
      </>

        );
    }
}

export default Italic;