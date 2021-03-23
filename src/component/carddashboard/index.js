import React, { Component } from 'react';

class CardDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <div className={this.props.className}>
              <div className="card m-b-20">
                <div className="card-body">
                {this.props.children}
                </div>
              </div>
            </div>
            </>
         );
    }
}
 
export default CardDashboard;