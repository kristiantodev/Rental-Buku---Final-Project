import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Menu, Footer } from "../../../template/admin";
import swal from "sweetalert";
import moment from "moment";
import {
  Button,
  IsiBody,
  HeaderContent,
  Content,
  Title,
  Modal,
  Div,
  Input,
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
  Tooltip,
  Span,
  Select,
  Option,
} from "../../../component";
import TablePagination from "@material-ui/core/TablePagination";
import ReactTooltip from "react-tooltip";
import ReactToPrint from "react-to-print";

class Laporan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      detail: {},
      listBuku: [],
      page: 0,
      rowsPerPage: 5,
      totalRows: 0,
      pilih: "",
      dari: "",
      sampai: "",
    };
  }

  getDataLaporan() {
    let url = `http://localhost:8080/api/laporan/?page=${
      this.state.page + 1
    }&limit=${this.state.rowsPerPage}`;

    Promise.all([fetch(url), fetch("http://localhost:8080/api/totallaporan/")])
      .then(([response, response2]) =>
        Promise.all([response.json(), response2.json()])
      )
      .then(([json, json2]) => {
        if (json.length === 0) {
          this.setState({
            items: [],
            totalRows: 0,
          });
        } else {
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

  addItemToState = (item) => {
    this.setState((prevState) => ({
      items: [...prevState.items, item],
    }));
  };

  componentDidMount() {
    this.getDataLaporan();
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage }, () => {
      this.getDataLaporan();
    });
  };

  changeRupiah = (bilangan) => {
    var reverse = bilangan.toString().split("").reverse().join(""),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(".").split("").reverse().join("");
    return ribuan;
  };

  getTotalBayar = (biaya, denda) => {
    var totalbayar = biaya + denda;
    return totalbayar;
  };

  detailData = (idPinjam) => {
    const indexCari = this.state.items.findIndex(
      (x) => x.idPinjam === idPinjam
    );
    const dataDetail = this.state.items[indexCari];
    const bukuDetail = this.state.items[indexCari].listBuku;

    this.setState({
      detail: dataDetail,
      listBuku: bukuDetail,
    });
  };

  setValueInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  checkAkses = () => {
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
  };

  render() {
    console.log("pilih", this.state.pilih);
    console.log("dari", this.state.dari);
    console.log("sampai", this.state.sampai);
    this.checkAkses();
    return (
      <>
        <Header />
        <Menu />
        <Content>
          <HeaderContent>
            <Title icon="fas fa-folder-open" judul="Laporan Peminjaman" />
            <Div className="state-information d-none d-sm-block">
              <ReactToPrint
                trigger={() => {
                  return (
                    <Button className="btn btn-primary">
                      <Italic className="fas fa-print" />
                      &nbsp; Cetak Data
                    </Button>
                  );
                }}
                content={() => this.componentRef}
              />
              <ComponentToPrint ref={el => (this.componentRef = el)} />
            </Div>
          </HeaderContent>

          <IsiBody>
            <Span>Cari Data :</Span>
            <Div className="form-group row">
              <Div className="col-5">
                <Select
                  value={this.state.pilih}
                  onChange={this.setValueInput}
                  name="pilih"
                >
                  <Option value="">-- Cari Data Berdasarkan --</Option>
                  <Option value="namaUser">Nama Peminjam</Option>
                  <Option value="judulBuku">Judul</Option>
                </Select>
              </Div>
              <Div className="col-5">
                <Input
                  type="text"
                  placeholder="Masukan Kata Kunci Pencarian"
                  name="cari"
                />
              </Div>
              <Div className="col-2">
                <Button className="btn btn-info col-12">
                  <Italic className="fas fa-search" />
                  &nbsp; Tampilkan
                </Button>
              </Div>
            </Div>

            <Div className="form-group row">
              <Div className="col-5">
                Dari :
                <Input
                  type="date"
                  name="dari"
                  value={this.state.dari}
                  onChange={this.setValueInput}
                />
              </Div>
              <Div className="col-5">
                Sampai :
                <Input
                  type="date"
                  name="sampai"
                  value={this.state.sampai}
                  onChange={this.setValueInput}
                />
              </Div>
            </Div>
            <Table className="table table-striped table-bordered dt-responsive nowrap">
              <TableHead>
                <TableRow>
                  <TableHeader>Nama</TableHeader>
                  <TableHeader>Tanggal Pinjam</TableHeader>
                  <TableHeader>Tanggal Kembali</TableHeader>
                  <TableHeader>Jumlah Pinjam</TableHeader>
                  <TableHeader>Biaya Rental</TableHeader>
                  <TableHeader>Denda</TableHeader>
                  <TableHeader>Total Bayar</TableHeader>
                  <TableHeader>Detail Buku</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.items.map((value, index) => {
                  return (
                    <TableRow align="center" key={index}>
                      <TableData align="left">{value.namaUser}</TableData>
                      <TableData>
                        {moment(value.tglPinjam).format("YYYY-MM-DD")}
                      </TableData>
                      <TableData>{value.tglKembali}</TableData>
                      <TableData>{value.listBuku.length}</TableData>
                      <TableData>
                        Rp.{" "}
                        {this.changeRupiah(
                          value.listBuku
                            .map((x) => x.hargaSewa)
                            .reduce((result, item) => result + item, 0)
                        )}
                      </TableData>
                      <TableData>
                        Rp. {this.changeRupiah(value.denda)}
                      </TableData>
                      <TableData>
                        Rp.{" "}
                        {this.changeRupiah(
                          this.getTotalBayar(
                            value.listBuku
                              .map((x) => x.hargaSewa)
                              .reduce((result, item) => result + item, 0),
                            value.denda
                          )
                        )}
                      </TableData>
                      <TableData>
                        <Tooltip keterangan="Detail buku yang dipinjam">
                          <ModalClick datatarget="#detail">
                            <Button
                              className="btn btn-outline-primary"
                              onClick={() => {
                                this.detailData(value.idPinjam);
                              }}
                            >
                              <Italic className="fas fa-folder-open" />
                            </Button>
                          </ModalClick>
                        </Tooltip>
                        <ReactTooltip />
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
          </IsiBody>
        </Content>
        <Footer />

        <Modal id="detail">
          <ModalContent className="modal-dialog modal-lg">
            <Div className="modal-header bg-primary">
              <ModalHeader judulheader="Detail Buku yang Dipinjam" />
            </Div>
            <Div className="modal-body">
              <Table className="dt-responsive nowrap">
                <TableHead></TableHead>
                <TableBody>
                  <TableRow>
                    <TableData>ID Peminjaman</TableData>
                    <TableData width="30">:</TableData>
                    <TableData width="300">
                      {this.state.detail.idPinjam}
                    </TableData>
                    <TableData
                      rowSpan="4"
                      width="250"
                      align="center"
                    ></TableData>
                  </TableRow>
                  <TableRow>
                    <TableData>ID Peminjam</TableData>
                    <TableData width="30">:</TableData>
                    <TableData>{this.state.detail.idUser}</TableData>
                  </TableRow>
                  <TableRow>
                    <TableData>Nama Peminjam</TableData>
                    <TableData width="30">:</TableData>
                    <TableData>{this.state.detail.namaUser}</TableData>
                  </TableRow>
                  <TableRow>
                    <TableData width="250">Tanggal Peminjaman</TableData>
                    <TableData width="30">:</TableData>
                    <TableData>{this.state.detail.tglPinjam}</TableData>
                  </TableRow>
                </TableBody>
              </Table>
              <br />
              <Table className="table dt-responsive nowrap">
                <TableHead>
                  <TableRow>
                    <TableHeader>ID Buku</TableHeader>
                    <TableHeader>Judul</TableHeader>
                    <TableHeader>Jenis Buku</TableHeader>
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
                        <TableData align="center">
                          Rp. {this.changeRupiah(value.hargaSewa)}
                        </TableData>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Laporan);

class ComponentToPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <>Print Data</>;
  }
}
