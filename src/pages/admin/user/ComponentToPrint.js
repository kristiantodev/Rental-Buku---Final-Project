import React, { Component } from "react";
import kop from "../../../image/kop.jpg";
import {
  TableReport,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableData,
  Center,
  Bold
} from "../../../component";


class ComponentToPrint extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render() {
      return(
         <>
                     <Center><img src={kop} alt="Buku"/><br/>
                    <h4><Bold> Laporan Data Pelanggan<br/>Rental Buku</Bold></h4>
         <TableReport className="table table-striped table-bordered dt-responsive nowrap">
                <TableHead>
                  <TableRow>
                  <TableHeader>No.</TableHeader>
                    <TableHeader>Nama</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>HP</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Tanggal Registrasi</TableHeader>
                    <TableHeader>Alamat</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.users.filter(a => a.role !== "Admin").map((value, index) => {
                    return (
                      <TableRow align="center" key={index}>
                        <TableData>{index+1}</TableData>
                        <TableData align="left">{value.namaUser}</TableData>
                        <TableData>{value.role}</TableData>
                        <TableData align="left">{value.phone}</TableData>
                        <TableData align="left">{value.email}</TableData>
                        <TableData>{value.tglRegistrasi}</TableData>
                        <TableData align="left">{value.alamat.substring(30,0)}</TableData>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </TableReport>
              </Center>

         </>
      );
    }
  }

export default ComponentToPrint;