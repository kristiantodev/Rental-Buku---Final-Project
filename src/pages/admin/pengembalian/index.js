import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Menu, Footer } from "../../../template/admin";
import moment from 'moment'
import swal from "sweetalert";
import $ from 'jquery';
import TablePagination from "@material-ui/core/TablePagination";
import {
  Button,
  IsiBody,
  HeaderContent,
  Content,
  Title,
  Card,
  Modal,
  Row,
  Div,
  ModalHeader,
  ModalContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableData,
  Italic,
  ModalClick,
  Bold, TextStatus,
  Label,
  Input
} from "../../../component";
const dateKembali = new Date()

class Pengembalian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pengembalian:{},
      listBuku : [],
      page: 0,
      rowsPerPage: 5,
      totalRows: 0,
      status:"",
      textColor:"black",
      denda : 0,
      totalBayar : 0,
      telat : 0,
      cari:""
    };
  }

  getPeminjaman() {
    let url = `http://localhost:8080/api/pengembalian/?page=${
      this.state.page + 1
    }&limit=${this.state.rowsPerPage}`;

    Promise.all([
      fetch(url),
      fetch("http://localhost:8080/api/total/")
    ])
      .then(([response, response2]) =>
        Promise.all([response.json(), response2.json()])
      )
      .then(([json, json2]) => {

        if(json.length === 0){
          this.setState({
            items: [],
            totalRows: 0,
          });
        }else{
          this.setState({
            items: json,
            totalRows: json2.totalData,
          });
        }
        

      })

      .catch(() => {
        swal("Gagal !", "Gagal mengambil data", "error");
      });
  }

  searchData = (el) => {
    var keyword = el.target.value;
    this.setState({
      cari: keyword,
    });

    if (keyword === "") {
      this.getPeminjaman();
    } else {
      let url = `http://localhost:8080/api/searchpengembalian/?keyword=${encodeURIComponent(
        keyword
      )}`;

      let url2 = `http://localhost:8080/api/searchpengembalianpaging/?keyword=${encodeURIComponent(keyword)}&page=${
        this.state.page + 1
      }&limit=${this.state.rowsPerPage}`;

      Promise.all([fetch(url), fetch(url2)])
        .then(([response, response2]) =>
          Promise.all([response.json(), response2.json()])
        )
        .then(([json, json2]) => {
          this.setState({
            items: json2,
          });

          const total = json.length;
          this.setState({ totalRows: total });
        })
        .catch((e) => {
          console.log(e);
          swal("Gagal !", "Gagal mengambil data", "error");
        });
    }
  };

  searchDataTampung = (keyword) => {
    fetch(
      `http://localhost:8080/api/searchpengembalianpaging/?keyword=${encodeURIComponent(keyword)}&page=${
        this.state.page + 1
      }&limit=${this.state.rowsPerPage}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json; ; charset=utf-8",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          items: json,
        });
      })
      .catch((e) => {
        console.log(e);
        swal("Gagal !", "Gagal mengambil data", "error");
      });
  };

  addItemToState = (item) => {
    this.setState((prevState) => ({
      items: [...prevState.items, item],
    }));
  };

  componentDidMount() {
    this.getPeminjaman();
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage }, () => {
      if (this.state.cari === "") {
        this.getPeminjaman();
      } else {
        this.searchDataTampung(this.state.cari);
      }
    });
  };


  getTanggal = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return (today = dd + '/' + mm + '/' + yyyy);
  };

  changeRupiah = (bilangan) => {
    var reverse = bilangan.toString().split("").reverse().join(""),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(".").split("").reverse().join("");
    return ribuan;
  };

  detailData = (idPinjam, tglPinjam) => {
    const indexCari = this.state.items.findIndex((x) => x.idPinjam === idPinjam);
    const dataDetail = this.state.items[indexCari];
    const bukuDetail = this.state.items[indexCari].listBuku;
    this.setState({
      pengembalian: dataDetail,
      listBuku : bukuDetail,
    });

    var datePinjam = new Date(tglPinjam); 
    datePinjam.setDate(datePinjam.getDate() + 5);
    var dtMaxPengembalian = datePinjam.getTime();
    var dtNow = dateKembali.getTime();

    var telat = dateKembali.getDate() - datePinjam.getDate();

    console.log("telat ", telat)
    console.log(dtMaxPengembalian)
    console.log(datePinjam)
    console.log(dateKembali)

    var denda;
    if(dtNow <= dtMaxPengembalian){
      denda=0;
      this.setState({
        textColor:"green",
        status:"TEPAT WAKTU",
        denda:denda,
        telat:0
      });
    }else if(dtNow >= dtMaxPengembalian){
      denda = telat*1000;
      this.setState({
        textColor:"red",
        status:"TELAT",
        denda : denda,
        telat : telat
      });
    }

    var total = bukuDetail.map((x) => x.hargaSewa)
    .reduce((result, item) => result + item, 0);

    var totalBayar = denda+total;

    this.setState({
      totalBayar : totalBayar
    });

  };

  updatePeminjaman = () => {

    const objekPengembalian = {
      idPinjam : this.state.pengembalian.idPinjam,
      denda:this.state.denda,
      listBuku : this.state.listBuku
    };

    fetch("http://localhost:8080/api/pengembalianbuku/", {
    method: "put",
    headers: {
      "Content-Type": "application/json; ; charset=utf-8",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(objekPengembalian),
  })
    .then((response) => response.json())
    .then((json) => {
      if (typeof json.errorMessage !== "undefined") {
        swal("Gagal !", json.errorMessage, "error");
      } else if (typeof json.successMessage !== "undefined") {
        swal({
          text: json.successMessage,
          icon: "success",
          title: "Berhasil !!"
          })
          .then((value) => {
            this.getPeminjaman();
            $("#pengembalian .close").click();
          })
          
      }
    })
    .catch((e) => {});
};

  checkAkses = () =>{
    if (
      this.props.checkLogin === true &&
      this.props.dataUserLogin.role === "Member"
    ) {
      this.props.history.push("/pelanggan");
    } else if (
      this.props.checkLogin === true &&
      this.props.dataUserLogin.role === "Umum"
    ) {
      this.props.history.push("/pelanggan");
    } else if (this.props.checkLogin === false) {
      this.props.history.push("/login");
    }
  }

  render() {
    this.checkAkses();
    return (
      <>
        <Header />
        <Menu />
        <Content>
          <HeaderContent>
            <Title icon="far fa-calendar-check" judul="Pengembalian Buku" />
          </HeaderContent>

          <IsiBody>
            <Row>
              <Div className="col-lg-9 col-md-6 col-5">
              <Div className="form-group row">
                  <Label className="col-sm-2 col-form-label">
                    Cari Peminjaman
                  </Label>
                  <Div className="col-sm-10">
                    <Input
                      type="text"
                      placeholder="Masukan Kata Kunci Pencarian"
                      name="cari"
                      onChange={this.searchData}
                    />
                  </Div>
                  </Div>

              {this.state.items.length !== 0 ?

              <>
              <Table className="table table-striped table-bordered dt-responsive nowrap">
                  <TableHead>
                    <TableRow>
                      <TableHeader>ID Pinjam</TableHeader>
                      <TableHeader>Nama Pelanggan</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Tanggal Pinjam</TableHeader>
                      <TableHeader>Aksi</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.state.items.map((value, index) => {
                      return (
                    <TableRow align="center" key={index}>
                      <TableData>{value.idPinjam}</TableData>
                      <TableData align="left">{value.namaUser}</TableData>
                      <TableData>{value.statusUser}</TableData>
                      <TableData>{value.tglPinjam}
                      </TableData>
                      <TableData>        
                      <ModalClick datatarget="#pengembalian">
                        <Button
                          className="btn btn-outline-warning"
                          onClick={() => {
                            this.detailData(value.idPinjam, value.tglPinjam);
                          }}
                        >
                          <Italic className="fas fa-edit" /> Pengembalian
                        </Button>
                        </ModalClick>                   
                      </TableData>
                    </TableRow>
                    );
                  })}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  count={this.state.totalRows}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  rowsPerPage={this.state.rowsPerPage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </>

              :

              <>
              <Table className="table table-striped table-bordered dt-responsive nowrap">
                  <TableHead>
                    <TableRow>
                      <TableHeader>ID Pinjam</TableHeader>
                      <TableHeader>Nama Pelanggan</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Tanggal Pinjam</TableHeader>
                      <TableHeader>Aksi</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  </TableBody>
                  </Table>
              </>
              
              }
                
                
              </Div>
              <Div className="col-lg-3 col-md-6 col-7">
                <Row>
                  <Card
                    size="col-xl-12"
                    color="card bg-secondary mini-stat position-relative"
                    judul="Tanggal :"
                    isi={this.getTanggal()}
                    icon="fas fa-tint display-1"
                  />
                  <Card
                    size="col-xl-12"
                    color="card bg-primary mini-stat position-relative"
                    judul="Pengembalian : "
                    isi={this.state.totalRows}
                    icon="fas fa-clock display-2"
                  />
                </Row>
              </Div>
            </Row>
          </IsiBody>
        </Content>
        <Footer />

        <Modal id="pengembalian">
          <ModalContent className="modal-dialog modal-lg">
            <Div className="modal-header bg-primary">
              <ModalHeader judulheader="Form Pengembalian Buku" />
            </Div>
            <Div className="modal-body">
            <Table className="dt-responsive nowrap">
                  <TableHead>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableData>ID Peminjaman</TableData>
                      <TableData width="30">:</TableData>
                      <TableData width="300">{this.state.pengembalian.idPinjam}</TableData>
                      <TableData rowSpan="4" width="250" align="center">
                        {moment(dateKembali).format('YYYY/MM/DD HH:MM:SS')}
                      <TextStatus color={this.state.textColor} status={this.state.status}/>
                      {this.state.telat !== 0 ? <Bold>({this.state.telat} hari)</Bold> : ""}
                      </TableData>
                    </TableRow>
                    <TableRow>
                      <TableData>ID Peminjam</TableData>
                      <TableData width="30">:</TableData>
                      <TableData>{this.state.pengembalian.idUser}</TableData>
                    </TableRow>
                    <TableRow>
                      <TableData>Nama Peminjam</TableData>
                      <TableData width="30">:</TableData>
                      <TableData>{this.state.pengembalian.namaUser}</TableData>
                    </TableRow>
                    <TableRow>
                      <TableData width="250">Tanggal Peminjaman</TableData>
                      <TableData width="30">:</TableData>
                      <TableData>{this.state.pengembalian.tglPinjam}</TableData>
                    </TableRow>
                  </TableBody>
                </Table>
                <br/>
            <Table className="table dt-responsive nowrap">
                  <TableHead>
                    <TableRow>
                      <TableHeader>ID Buku</TableHeader>
                      <TableHeader>Judul</TableHeader>
                      <TableHeader>Jenis Buku</TableHeader>
                      <TableHeader>Jumlah</TableHeader>
                      <TableHeader>Harga Sewa</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.state.listBuku.map((value, index) => {
                      return (
                        <TableRow key={index}>
                      <TableData align="center">{value.idBuku}</TableData>
                      <TableData>{value.judulBuku}</TableData>
                      <TableData align="center">{value.jenisBuku}</TableData>
                      <TableData align="center">{value.qty}</TableData>
                      <TableData align="center">Rp. {this.changeRupiah(value.hargaSewa)}</TableData>
                    </TableRow>
                     );
                    })}
                    <TableRow>
                      <TableData colSpan="3">
                        <Bold>Total</Bold>
                      </TableData>
                      <TableData align="center"><Bold>{this.state.listBuku.length}</Bold></TableData>
                      <TableData align="center"><Bold>
                      Rp. {this.changeRupiah(this.state.listBuku
                            .map((x) => x.hargaSewa)
                            .reduce((result, item) => result + item, 0))}
                        </Bold></TableData>
                    </TableRow>
                    <TableRow>
                      <TableData colSpan="3">
                        <Bold>Denda</Bold>
                      </TableData>
                      <TableData align="center"></TableData>
                      <TableData align="center"><Bold>Rp. {this.changeRupiah(this.state.denda)}</Bold></TableData>
                    </TableRow>
                    <TableRow>
                      <TableData colSpan="3">
                        <Bold>Total Bayar</Bold>
                      </TableData>
                      <TableData align="center"></TableData>
                      <TableData align="center"><Bold>Rp. {this.changeRupiah(this.state.totalBayar)}</Bold></TableData>
                    </TableRow>
                  </TableBody>
                </Table>
      
            </Div>
            <Div className="modal-footer">
              <Button className="btn btn-outline-success" onClick={() => {
                            this.updatePeminjaman()
                          }}>
                <i className="fas fa-check" /> &nbsp;Konfirmasi Pengembalian
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

export default connect(mapStateToProps, mapDispatchToProps)(Pengembalian);
