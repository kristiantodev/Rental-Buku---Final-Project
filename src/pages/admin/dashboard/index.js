import React, { Component } from 'react';
import { connect } from "react-redux"
import { Header, Menu, Footer } from "../../../template/admin"
import { Card, Content, HeaderContent, IsiDashboard, Title, Select, Option, Div } from "../../../component"
import {Bar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import swal from "sweetalert";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bukuTerpinjam : 0,
      totalPendapatanRental:0,
      bulan : [
        {
          bulan : 1,
          namaBulan: "Januari"
        },
        {
          bulan : 2,
          namaBulan: "Februari"
        },
        {
          bulan : 3,
          namaBulan: "Maret"
        },
        {
          bulan : 4,
          namaBulan: "April"
        },
        {
          bulan : 5,
          namaBulan: "Mei"
        },
        {
          bulan : 6,
          namaBulan: "Juni"
        },
        {
          bulan : 7,
          namaBulan: "Juli"
        },
        {
          bulan : 8,
          namaBulan: "Agustus"
        },
        {
          bulan : 9,
          namaBulan: "September"
        },
        {
          bulan : 10,
          namaBulan: "Oktober"
        },
        {
          bulan : 11,
          namaBulan: "November"
        },
        {
          bulan : 12,
          namaBulan: "Desember"
        }
      ],
      pelangganTeraktif : {
        labels: [],
        datasets: [
          {
            label: 'Total Pinjam',
            backgroundColor: '#00a0df',
            borderColor: '#00a0df',
            borderWidth: 1,
            data: []
          }
        ]
      },
      pendapatanBulan : {
        labels: [],
        datasets: [
          {
            label: 'Total',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        ]
      },
      bukuPopuler : {
        labels: [],
        datasets: [
          {
            label: 'Jumlah dipinjam',
            backgroundColor: [
              '#B21F00',
              '#C9DE00',
              '#2FDE00',
              '#00A6B4',
              '#6800B4'
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F'
            ],
            data: []
          }
        ]
      }
    }
  }

  componentDidMount(){
    Promise.all([
      fetch("http://localhost:8080/api/pelangganteraktif/"),
      fetch("http://localhost:8080/api/bukupopuler/"),
      fetch("http://localhost:8080/api/pendapatanbulanini/"),
      fetch("http://localhost:8080/api/bukuterpinjam/"),
      fetch("http://localhost:8080/api/totalpendapatanrental/"),
    ])
      .then(([response, response2, response3, response4, response5]) =>
        Promise.all([response.json(), response2.json(), response3.json(), response4.json(), response5.json()])
      )
      .then(([json, json2, json3, json4, json5]) => {
        
        this.setState({
          bukuTerpinjam:json4.data,
          totalPendapatanRental:json5.data
        })

        const label = json.map(function (obj) {
          return obj.label;
        });

        const data = json.map(function (obj) {
          return obj.data;
        });

        const labelBuku = json2.map(function (obj) {
          return obj.label;
        });

        const dataBuku = json2.map(function (obj) {
          return obj.data;
        });

        const labelPdp = json3.map(function (obj) {
          return obj.label;
        });

        const dataPdp = json3.map(function (obj) {
          return obj.data;
        });

        const dataUpdate = {
          labels: label,
          datasets: [
            {
              label: 'Total Pinjam',
              backgroundColor: '#00a0df',
              borderColor: '#00a0df',
              borderWidth: 1,
              data: data
            }
          ]
        }

        const bukuUpdate = {
          labels: labelBuku,
          datasets: [
            {
              label: 'Total',
              backgroundColor: [
                '#B21F00',
                '#C9DE00',
                '#2FDE00',
                '#00A6B4',
                '#6800B4'
              ],
              hoverBackgroundColor: [
              '#501800',
              '#4B5000',
              '#175000',
              '#003350',
              '#35014F'
              ],
              data: dataBuku
            }
          ]
        }

        const pdpUpdate = {
          labels: labelPdp,
          datasets: [
            {
              label: 'Total',
              fill: false,
              lineTension: 0.5,
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: dataPdp
            }
          ]
        }

        this.setState({
          pelangganTeraktif : dataUpdate,
          bukuPopuler : bukuUpdate,
          pendapatanBulan:pdpUpdate
        })

      })
      .catch(() => {
        swal("Gagal !", "Gagal mengambil data", "error");
      });
  }

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

  checkAkses=()=>{
    if (this.props.checkLogin === true && this.props.dataUserLogin.role === "Member") {
      this.props.history.push("/pelanggan");
    }else if(this.props.checkLogin === true && this.props.dataUserLogin.role === "Umum"){
      this.props.history.push("/pelanggan");
    }else if(this.props.checkLogin === false){
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
            <Title icon="fas fa-th-large" judul="Dashboard Admin" />
            <Div className="state-information d-none d-sm-block">
            <Div className="form-group row">
              <Div className="col-6">
                <Select
                  value={this.state.idJenisBuku}
                  onChange={this.setValueInput}
                  name="idJenisBuku"
                >
                  <Option value="">-- Pilih Bulan--</Option>
                </Select>
              </Div>
              <Div className="col-6">
                <Select
                  value={this.state.idJenisBuku}
                  onChange={this.setValueInput}
                  name="idJenisBuku"
                >
                  <Option value="">-- Pilih Tahun--</Option>
                </Select>
              </Div>
            </Div>
            </Div>
          </HeaderContent>
          <IsiDashboard>
            <Card size="col-xl-4 col-md-6" color="card bg-secondary mini-stat position-relative" judul="Buku Terpinjam :" isi={this.state.bukuTerpinjam +" Buku"} icon="fas fa-book-open display-2" />
            <Card size="col-xl-4 col-md-6" color="card bg-primary mini-stat position-relative" judul="Tanggal :" isi={this.getTanggal()} icon="fas fa-clock display-2" />
            <Card size="col-xl-4 col-md-6" color="card bg-secondary mini-stat position-relative" judul="Total Pendapatan :" isi={"Rp. "+this.changeRupiah(this.state.totalPendapatanRental)} icon="far fa-money-bill-alt display-2" />
            </IsiDashboard>
        
<div className="row">
  <div className="col-xl-6">
    <div className="card m-b-20">
      <div className="card-body">
      <Bar
          data={this.state.pelangganTeraktif}
          options={{
            title:{
              display:true,
              text:'3 Pelanggan Teraktif',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    </div>
  </div> {/* end col */}
  <div className="col-xl-6">
    <div className="card m-b-20">
      <div className="card-body">
      <Doughnut
          data={this.state.bukuPopuler}
          options={{
            title:{
              display:true,
              text:'5 Buku Terpopuler',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    </div>
  </div> {/* end col */}
</div> {/* end row */}

<div className="row">
  <div className="col-xl-12">
    <div className="card m-b-20">
      <div className="card-body">
      <Line
          data={this.state.pendapatanBulan}
          options={{
            title:{
              display:true,
              text:'Pendapatan Bulan ini (dalam hari)',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    </div>
  </div> {/* end col */}
</div> {/* end row */}
        </Content>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  checkLogin: state.AReducer.isLogin,
  dataUserLogin: state.AReducer.userLogin
})

const mapDispatchToProps = dispatch => {
  return {
    keluar: () => dispatch({ type: "LOGOUT_SUCCESS" }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);