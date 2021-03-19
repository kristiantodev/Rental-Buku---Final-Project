import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Menu, Footer } from "../../../template/pelanggan";
import { Line } from "react-chartjs-2";
import swal from "sweetalert";
import {
  Card,
  Content,
  HeaderContent,
  IsiDashboard,
  IsiHistory,
  Title,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableData,
  ModalClick,
  Italic,
  Button,
  Div,
  Modal,
  ModalContent,
  ModalHeader,
} from "../../../component";

class DashboardPelanggan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      riwayatPeminjaman: [
        {
          idPinjam: "",
          idUser: "",
          namaUser: "",
          statusUser: "",
          tglPinjam: "",
          tglKembali: "",
          statusPinjam: 0,
          denda: 0,
          totalData: 0,
          listBuku: [
            {
              idDetailPinjam: "",
              idPinjam: "",
              idBuku: "",
              judulBuku: "",
              jenisBuku: "",
              hargaSewa: 0,
              qty: 1,
            },
          ],
        },
      ],
      totalBukuTerpinjam:0,
      totalBukuBelumDikembalikan:0,
      totalPengeluaran:0,
      pengeluaran: {
        labels: [],
        datasets: [
          {
            label: "Total",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: [],
          },
        ],
      },
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(
        `http://localhost:8080/api/pengeluaranpelanggan/?idUser=${encodeURIComponent(
          this.props.dataUserLogin.idUser
        )}`
      ),
      fetch(
        `http://localhost:8080/api/riwayatpeminjaman/?idUser=${encodeURIComponent(
          this.props.dataUserLogin.idUser
        )}`
      ),
      fetch(`http://localhost:8080/api/totalbukupinjam/?idUser=${encodeURIComponent(
        this.props.dataUserLogin.idUser
      )}`),
      fetch(`http://localhost:8080/api/totalbukubelumdikembalikan/?idUser=${encodeURIComponent(
        this.props.dataUserLogin.idUser
      )}`),
      fetch(`http://localhost:8080/api/totalpengeluaran/?idUser=${encodeURIComponent(
        this.props.dataUserLogin.idUser
      )}`)
    ])
      .then(([response, response2, response3, response4, response5]) =>
        Promise.all([response.json(), response2.json(), response3.json(), response4.json(), response5.json()])
      )
      .then(([json, json2, json3, json4, json5]) => {

        this.setState({
          totalBukuTerpinjam : json3.data,
          totalBukuBelumDikembalikan:json4.data,
          totalPengeluaran:json5.data
        })

        if (json2.length !== 0) {
          this.setState({
            riwayatPeminjaman: json2,
          });
        }

        console.log("object", this.state.riwayatPeminjaman);

        const labelPdp = json.map(function (obj) {
          return obj.label;
        });

        const dataPdp = json.map(function (obj) {
          return obj.data;
        });

        const pdpUpdate = {
          labels: labelPdp,
          datasets: [
            {
              label: "Total",
              fill: false,
              lineTension: 0.5,
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
              data: dataPdp,
            },
          ],
        };

        this.setState({
          pengeluaran: pdpUpdate,
        });
      })
      .catch(() => {
        swal("Gagal !", "Gagal mengambil data", "error");
      });
  }

  getTanggal = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    return (today = dd + "/" + mm + "/" + yyyy);
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

  checkAkses = () =>{
    if (
      this.props.checkLogin === true &&
      this.props.dataUserLogin.role === "Admin"
    ) {
      this.props.history.push("/admin");
    } else if (this.props.checkLogin === false) {
      this.props.history.push("/login");
    }
  }

  render() {
    this.checkAkses();
    console.log(this.state.riwayatPeminjaman)
    return (
      <>
        <Header />
        <Menu />
        <Content>
          <HeaderContent>
            <Title icon="fas fa-th-large" judul="Dashboard" />
            <Div className="state-information d-none d-sm-block">
              <ModalClick datatarget="#buku">
                <Button className="btn btn-primary">
                  <Italic className="fas fa-clock" />
                  &nbsp; Riwayat Peminjaman
                </Button>
              </ModalClick>
            </Div>
          </HeaderContent>
          <IsiDashboard>
            <Card
              size="col-xl-4 col-md-6"
              color="card bg-secondary mini-stat position-relative"
              judul="Buku Dikembalikan"
              isi={this.state.totalBukuTerpinjam + " Buku"}
              icon="fas fa-book-open display-2"
            />
            <Card
              size="col-xl-4 col-md-6"
              color="card bg-primary mini-stat position-relative"
              judul="Buku Belum Dikembalikan"
              isi={this.state.totalBukuBelumDikembalikan + " Buku"}
              icon="fas fa-clock display-2"
            />
            <Card
              size="col-xl-4 col-md-6"
              color="card bg-secondary mini-stat position-relative"
              judul="Pengeluaran Bulan ini"
              isi={"Rp. "+this.changeRupiah(this.state.totalPengeluaran)}
              icon="far fa-money-bill-alt display-2"
            />
          </IsiDashboard>

          <IsiHistory>
            <Line
              data={this.state.pengeluaran}
              options={{
                title: {
                  display: true,
                  text: "Riwayat Pengeluaran Peminjaman (Bulan Ini)",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </IsiHistory>
        </Content>
        <Footer />

        <Modal id="buku">
          <ModalContent className="modal-dialog modal-lg">
            <Div className="modal-header bg-primary">
              <ModalHeader judulheader="Riwayat Peminjaman" />
            </Div>
            <Div className="modal-body">
              <Table className="table table-striped table-bordered dt-responsive nowrap">
                <TableHead>
                  <TableRow>
                    <TableHeader>Tanggal Pinjam</TableHeader>
                    <TableHeader>Pengembalian</TableHeader>
                    <TableHeader>Buku yang dipinjam</TableHeader>
                    <TableHeader>Biaya Sewa</TableHeader>
                    <TableHeader>Denda</TableHeader>
                    <TableHeader>Total bayar</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.riwayatPeminjaman.map((value, index) => {
                    return (
                      <TableRow align="center" key={index}>
                        <TableData>{value.tglPinjam}</TableData>
                        <TableData>{value.tglKembali !== null? value.tglKembali : <><b>BELUM DIKEMBALIKAN</b></>}</TableData>
                        <TableData align="left">{value.listBuku.map((buku, idx) => {
                    return (
                       <ul key={idx}>
                         <li>
                           {buku.judulBuku} (Rp. {this.changeRupiah(buku.hargaSewa)})
                         </li>
                       </ul>
                    );
                  })}</TableData>
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
                          Rp. {this.changeRupiah(this.getTotalBayar(
                            value.listBuku
                              .map((x) => x.hargaSewa)
                              .reduce((result, item) => result + item, 0),
                            value.denda
                          ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPelanggan);
