import React, { Component } from 'react';

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
               
           }
    }


    render() {
        return (
          <>

<div className="user-details">
              <div className="float-left mr-2">
                <img
                  src={this.props.logo}
                  className="thumb-md rounded-circle"
                  alt="Gambar"
                />
              </div>
              <div className="user-info">
                <font color="#0285b4">
                  <b>{this.props.nama}</b>
                </font>
                <p className="text-white">
                  <font color="#0285b4">{this.props.status}</font>
                </p>
              </div>
            </div>
      </>

        );
    }
}

export default UserDetail;