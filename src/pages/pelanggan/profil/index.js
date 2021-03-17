import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Menu, Footer } from "../../../template/pelanggan";
import gambarKomik from "../../../adm.jpg";
import swal from 'sweetalert';
import $ from 'jquery';
import {
  Button,
  IsiBody,
  HeaderContent,
  Content,
  Title,
  Row,
  Div,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableData,
  Italic,
  Center,
  Modal,
  ModalHeader,
  ModalContent,
  ModalClick,
  Label,
  Input,
  Textarea
} from "../../../component";

class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser : "",
      username : "",
      password : "",
      namaUser : "",
      alamat : "",
      phone : "",
      email : "",
      role : "",
      passwordUlangi : "",
      userProfil : {},
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

  updatePassword = () => {
    let obj = this.state;
    console.log(obj.password);
    console.log(obj.passwordUlangi);

    if (
      obj.password === "" ||
      obj.passwordUlangi === ""
    ) {
      swal("Gagal !", "password baru dan Konfirmasi password baru wajib diisi", "error");
  
    } else if (obj.password !== obj.passwordUlangi) {
      swal("Gagal !", "Password dan Konfirmasi password baru tidak sesuai", "error");
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
            $("#password .close").click();
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


  refreshPage = () => {
    window.location.reload()
  };

  editClick = () => {
    this.setState({
      idUser : this.props.dataUserLogin.idUser,
      username : this.state.userProfil.username,
      namaUser : this.state.userProfil.namaUser,
      alamat : this.state.userProfil.alamat,
      email: this.state.userProfil.email,
      phone : this.state.userProfil.phone,
      role : this.props.dataUserLogin.role
    });
  };

  updateProfil = () => {
    let obj = this.state;

    if (
      obj.username === "" ||
      obj.namaUser === "" ||
      obj.phone === ""
    ) {

      swal("Gagal !", "Username, Nama Pengguna, dan No.HP baru wajib diisi", "error");

    } else {

      const dataProfil = {
        idUser : this.props.dataUserLogin.idUser,
        username: this.state.username,
        namaUser : this.state.namaUser,
        alamat : this.state.alamat,
        email : this.state.email,
        phone : this.state.phone
      };

      swal({
        title: "Apakah anda yakin ?",
        text: "Anda akan mengubah profil dan username anda...",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((konfirmasi) => {
        if (konfirmasi) {
          
        fetch("http://localhost:8080/api/updateprofil/", {
        method: "put",
        headers: {
          "Content-Type": "application/json; ; charset=utf-8",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(dataProfil),
      })
        .then((response) => response.json())
        .then((json) => {
          if (typeof json.errorMessage !== "undefined") {
            swal("Gagal !", json.errorMessage, "error");
          } else if(typeof json.successMessage !== "undefined"){
            $("#profil .close").click();
            swal({
              text: json.successMessage,
              icon: "success",
              title: "Berhasil !!"
              })
              .then((value) => {
                this.getProfil()
                this.props.history.push("/pelanggan/profil")
              })
            
          }
        })
        .catch((e) => {
          
        });
        
        } else {
          swal("Batal !", "Edit Profil dibatalkan...", "error");
        }
      });

    }
  };

  setValueInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    if (this.props.checkLogin === true && this.props.dataUserLogin.role === "Admin") {
      this.props.history.push("/admin");
    }else if(this.props.checkLogin === false){
      this.props.history.push("/login");
    }
    return (
      <>
        <Header />
        <Menu />
        <Content>
          <HeaderContent>
            <Title
              icon="fas fa-user"
              judul="Profil Saya"
            />
            <Div className="state-information d-none d-sm-block">
            <ModalClick datatarget="#password">
              <Button className="btn btn-primary">
                <Italic className="fas fa-key" />
                &nbsp; Ubah Password
              </Button>
              </ModalClick>
            </Div>
          </HeaderContent>

          <IsiBody>
            <Row>
              <Div className="col-lg-4">
    
  <Center><img src={gambarKomik} height={225} width={200} alt="Foto Profil Default"/> 
  <br/>
  <ModalClick datatarget="#profil">
      <Button className="btn btn-outline-primary waves-effect waves-light" onClick={this.editClick}>
        <Italic className="fa fa-edit" /> Lengkapi atau Ubah Profil
      </Button>
  </ModalClick>
  </Center>


              </Div>
              <Div className="col-lg-7">
              <Table className="table dt-responsive nowrap">
                  <TableHead>
                    <TableRow>
                      <TableHeader colSpan="3">Identitas Pelanggan</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableData width="250">ID Pelanggan</TableData>
                      <TableData width="30">:</TableData>
                      <TableData>{this.props.dataUserLogin.idUser}</TableData>
                    </TableRow>
                    <TableRow>
                      <TableData width="250">Username</TableData>
                      <TableData width="30">:</TableData>
                      <TableData>{this.state.userProfil.username}</TableData>
                    </TableRow>
                    <TableRow>
                      <TableData width="250">Nama Lengkap</TableData>
                      <TableData width="30">:</TableData>
                      <TableData>{this.state.userProfil.namaUser}</TableData>
                    </TableRow>
                    <TableRow>
                      <TableData width="250">HP</TableData>
                      <TableData width="30">:</TableData>
                      <TableData>{this.state.userProfil.phone}</TableData>
                    </TableRow>
                    <TableRow>
                      <TableData width="250">Email</TableData>
                      <TableData width="30">:</TableData>
                      <TableData>{this.state.userProfil.email}</TableData>
                    </TableRow>
                    <TableRow>
                      <TableData width="250">Alamat</TableData>
                      <TableData width="30">:</TableData>
                      <TableData>{this.state.userProfil.alamat}</TableData>
                    </TableRow>
                    <TableRow>
                      <TableData width="250">Status</TableData>
                      <TableData width="30">:</TableData>
                      <TableData>{this.props.dataUserLogin.role}</TableData>
                    </TableRow>
                  </TableBody>
                </Table>

              </Div>
            </Row>
          </IsiBody>
        </Content>
        <Footer />

        <Modal id="password">
          <ModalContent className="modal-dialog">
            <Div className="modal-header bg-primary">
              <ModalHeader judulheader="Ubah Password" />
            </Div>
            <Div className="modal-body">
            
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
            </Div>
            <Div className="modal-footer">
              <Button className="btn btn-outline-primary" onClick={this.updatePassword}>
                <Italic className="fas fa-check" /> &nbsp;Ubah Password
              </Button>
            </Div>
          </ModalContent>
        </Modal>

        <Modal id="profil">
          <ModalContent className="modal-dialog">
            <Div className="modal-header bg-primary">
              <ModalHeader judulheader="Ubah Profil Pelanggan" />
            </Div>
            <Div className="modal-body">
            <Div className="form-group">
              <Input
                type="text"
                placeholder=""
                value={this.state.idUser}
                name="idUser"
                onChange={this.setValueInput}
                disabled={true}
              />
            </Div>
            <Div className="form-group">
              <Label>Username<font color="red">*</font></Label>
              <Input
                type="text"
                placeholder=""
                name="username"
                onChange={this.setValueInput}
                value={this.state.username}
              />
            </Div>
            <Div className="form-group">
              <Label>Nama Pengguna<font color="red">*</font></Label>
              <Input
                type="text"
                placeholder=""
                name="namaUser"
                onChange={this.setValueInput}
                value={this.state.namaUser}
              />
            </Div>
            <Div className="form-group">
              <Label>No.HP<font color="red">*</font></Label>
              <Input
                type="text"
                placeholder=""
                name="phone"
                onChange={this.setValueInput}
                value={this.state.phone}
              />
            </Div>
            <Div className="form-group">
              <Textarea
                name="alamat"
                placeholder="Alamat"
                onChange={this.setValueInput}
                value={this.state.alamat}
              />
            </Div>
            <Div className="form-group">
              <Input
                type="email"
                placeholder="Email"
                name="email"
                onChange={this.setValueInput}
                value={this.state.email}
              />
            </Div>
            <Div className="form-group">
              <Input
                type="text"
                placeholder=""
                value={this.state.role}
                name="role"
                onChange={this.setValueInput}
                disabled={true}
              />
            </Div>
            </Div>
            <Div className="modal-footer">
              <Button className="btn btn-outline-primary" onClick={this.updateProfil}>
                <Italic className="fas fa-save" /> &nbsp;Simpan Perubahan
              </Button>
            </Div>
          </ModalContent>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
