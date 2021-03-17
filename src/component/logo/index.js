import React, { Component } from 'react';

class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        
        return (
          <>

<h6 className="text-center m-0">
            <img src={this.props.logo} height={130} width={190} alt="logo" />
          </h6>
          
      </>

        );
    }
}

export default Logo;