import React, { Component } from 'react';


class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { judul, isi, icon, color, size } = this.props
        return (
            <div className={size}>
            <div className={color}>
              <div className="card-body">
                  <div className="text-white">
                    <h6 className="mt-0 text-white-50">{judul}</h6>
                    <h4 className="mb-3 mt-0"><b> 
                      {isi}</b></h4>
                  </div>
                  <div className="mini-stat-icon">
                    <i className={icon} />
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default Card;