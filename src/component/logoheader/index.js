import React, { Component } from 'react';

class LogoHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        
        return (
          <>

<h4 className="font-18 m-b-5 text-center text-primary">
              {this.props.header} <br />
              Kharisma
            </h4>
            <br/>
          
      </>

        );
    }
}

export default LogoHeader;