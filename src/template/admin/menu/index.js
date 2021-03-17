import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Fitur, Sidemenu, Li, SidebarMenu, Italic, SidemenuBody, Span, UserDetail } from "../../../component";
import { connect } from "react-redux";
import logo from "../../../adm.jpg";
import swal from 'sweetalert';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfil:{}
    };
  }

  getProfil = () => {
    fetch(`http://localhost:8080/api/profil/?idUser=${encodeURIComponent(this.props.dataUserLogin.idUser)}`, {
      method: "get",
      headers: {
          "Content-Type": "application/json; ; charset=utf-8",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Access-Control-Allow-Origin": "*"
      }
  })
  .then(response => response.json())
  .then(json => {
      this.setState({ 
          userProfil: json
      });

      if(typeof json.errorMessage !== 'undefined')
      {
        swal("Gagal !", json.errorMessage , "error");
      }
  })
  .catch((e) => {
      console.log(e);
      swal("Gagal !", "Gagal mengambil data", "error");
  });
 
  };

  componentDidMount(){
    this.getProfil()
  }


  render() {
    return (
      <>
        <Sidemenu className="left side-menu side-menu-light">
        <Link to="/admin/profil">
          <UserDetail logo={logo} nama={this.state.userProfil.namaUser} status={this.state.userProfil.role}/>
        </Link>
          <SidebarMenu>
            <SidemenuBody>
              <Li>
                <Link to="/admin">
                  <Fitur onClick={() => this.props.history.push("/admin")}>
                    <Italic className="fas fa-th-large" />
                    <Span> Dashboard </Span>
                  </Fitur>
                </Link>
              </Li>

              

              <Li>
                <Link to="/admin/user">
                  <Fitur onClick={() => this.props.history.push("/admin/user")}>
                    <Italic className="fas fa-users" />
                    <Span> Pengguna</Span>
                  </Fitur>
                </Link>
              </Li>

              <Li>
                <Link to="/admin/buku">
                  <Fitur onClick={() => this.props.history.push("/admin/buku")}>
                    <Italic className="fas fa-book" />
                    <Span> Buku</Span>
                  </Fitur>
                </Link>
              </Li>

              <Li>
                <Link to="/admin/pengembalian">
                  <Fitur onClick={() => this.props.history.push("/admin/pengembalian")}>
                    <Italic className="far fa-calendar-check" />
                    <Span> Pengembalian</Span>
                  </Fitur>
                </Link>
              </Li>

              <Li>
                <Link to="/admin/laporan">
                  <Fitur onClick={() => this.props.history.push("/admin/laporan")}>
                    <Italic className="fas fa-folder-open" />
                    <Span> Laporan</Span>
                  </Fitur>
                </Link>
              </Li>
            </SidemenuBody>
          </SidebarMenu>
        </Sidemenu>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  dataUserLogin: state.AReducer.userLogin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => dispatch({ type: "LOGOUT_SUCCESS" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
