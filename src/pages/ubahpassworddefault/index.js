import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../image/img.png"
import swal from 'sweetalert';
import {
  Button,
  Input,
  Label,
  AccountPage,
  Div,
  Italic,
  Logo,
} from "../../component";

class UbahPasswordDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordUlangi : "",
      passwordLama : "",
    };
  }

  setValueInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updatePassword = () => {
    let obj = this.state;
    console.log(obj.password);
    console.log(obj.passwordUlangi);

    if (
      obj.password === "" ||
      obj.passwordUlangi === "" || obj.passwordLama === ""
    ) {
      swal("Gagal !", "password lama, password baru dan Konfirmasi password baru wajib diisi", "error");
  
    } else if (obj.password !== obj.passwordUlangi) {
      swal("Gagal !", "Password dan Konfirmasi password baru tidak sesuai", "error");
    } else if (obj.passwordLama !== this.props.dataUserLogin.password) {
      swal("Gagal !", "Password lama tidak sesuai!!", "error");
    } else if (obj.password === this.props.dataUserLogin.password) {
      swal("Gagal !", "Password lama dan password baru tidak boleh sama!", "error");
    } else {

      const dataPassword = {
        idUser : this.props.dataUserLogin.idUser,
        password: this.state.password,   
      };

      swal({
        title: "Apakah anda yakin ?",
        text: "Password akan diganti dan anda akan keluar dari sistem...",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((konfirmasi) => {
        if (konfirmasi) {
          
        fetch("http://localhost:8080/api/updatepassword/", {
        method: "put",
        headers: {
          "Content-Type": "application/json; ; charset=utf-8",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(dataPassword),
      })
        .then((response) => response.json())
        .then((json) => {
          if (typeof json.errorMessage !== "undefined") {
            swal("Gagal !", json.errorMessage, "error");
          } else if(typeof json.successMessage !== "undefined"){

            swal({
              text: json.successMessage,
              icon: "success",
              title: "Berhasil !!"
              })
              .then((value) => {
                this.props.keluar()
              })
              
          }
        })
        .catch((e) => {});
        } else {
          swal("Batal !", "Ganti password dibatalkan...", "error");
        }
      });

    }
  };

checkAkses= () => {
  if (this.props.checkLogin === true && this.props.dataUserLogin.role === "Admin") {
    this.props.history.push("/admin");
  }else if(this.props.checkLogin === true && this.props.dataUserLogin.role !== "Admin" && this.props.dataUserLogin.password !== this.props.dataUserLogin.username){
    this.props.history.push("/pelanggan");
  }else if(this.props.checkLogin === false){
    this.props.history.push("/login");
  }
}

  render() {
    this.checkAkses();
    return (
      <>
        <AccountPage className="wrapper-page">
          <Logo logo={logo} />
          <Div className="p-1">
            <h4 className="font-18 m-b-5 text-center text-primary">Ubah Password<br/> (Username : {this.props.dataUserLogin.username})<br/></h4>
            <Div className="form-group">
              <Label>Password Lama<font color="red">*</font></Label>
              <Input
                type="password"
                placeholder=""
                name="passwordLama"
                onChange={this.setValueInput}
                value={this.state.passwordLama}
              />
            </Div>
            <Div className="form-group">
              <Label>Password Baru<font color="red">*</font></Label>
              <Input
                type="password"
                placeholder=""
                name="password"
                onChange={this.setValueInput}
                value={this.state.password}
              />
            </Div>
            <Div className="form-group">
              <Label>Konfirmasi Password Baru<font color="red">*</font></Label>
              <Input
                type="password"
                placeholder=""
                name="passwordUlangi"
                onChange={this.setValueInput}
                value={this.state.passwordUlangi}
              />
            </Div>
            <Div className="form-group row m-t-20">
              <Div className="col-12 text-right">
                <Button
                  className="btn btn-success waves-effect waves-light form-control"
                  onClick={this.updatePassword}
                >
                  <Italic className="fas fa-sign-in-alt" /> Ubah Password
                </Button>
              </Div>
            </Div>
          </Div>
        </AccountPage>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  checkLogin: state.AReducer.isLogin,
  dataUserLogin: state.AReducer.userLogin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    keluar: () => dispatch({ type: "LOGOUT_SUCCESS" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UbahPasswordDefault);
