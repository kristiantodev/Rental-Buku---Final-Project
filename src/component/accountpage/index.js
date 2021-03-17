import React, { Component } from 'react';

class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
       
        return (
          <>
 <div className="account-pages" />
  <div className={this.props.className}>
    <div className="card">
      <div className="card-body">
    
          {this.props.children}
      
          </div>
          </div>
          </div>

      </>

        );
    }
}

export default AccountPage;