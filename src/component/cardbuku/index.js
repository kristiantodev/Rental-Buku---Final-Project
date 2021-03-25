import React, { Component } from 'react';


class CardBuku extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { src, datatarget, judul, pengarang, sewa, stokBuku} = this.props
        return (
          <div className="col-xl-4">
          <div className="cardBuku m-b-30">
          <div href="#" data-toggle="modal" onClick={this.props.onClick} className="waves-effect" data-target={datatarget}>
            <img className="card-img-top" src={src} height={250} alt="Buku" />
          </div>
            <div className="card-body">
              <h4 className="font-16 mt-0 text-primary">
              <div href="#" onClick={this.props.onClick} data-toggle="modal" className="waves-effect" data-target={datatarget}>
                {judul} {stokBuku !== 0 ? <><span className="badge badge-success">Stok : {stokBuku}</span></> : <><span className="badge badge-danger">Kosong</span></>}
              </div>
                </h4>
              <p className="card-text">
              Pengarang : {pengarang}<br/>
              Sewa/hari : Rp. {sewa}
              </p>
              
            </div>
          </div>
        </div>
        );
    }
}

export default CardBuku;