import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import {
  Dashboard,
  User,
  Buku,
  Pengembalian,
  Laporan,
  ProfilAdmin
} from "../../../pages/admin";
import {
  DashboardPelanggan,
  BukuList,
  Keranjang,
  Profil,
} from "../../../pages/pelanggan";
import { Login } from "../../../pages";
import { Registrasi } from "../../../pages";
import { UbahPasswordDefault } from "../../../pages";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Switch>
        <Route path="/admin/user" component={(props) => <User {...props} />} />
        <Route path="/admin/buku" component={(props) => <Buku {...props} />} />
        <Route path="/admin/profil" component={(props) => <ProfilAdmin {...props} />} />
        <Route
          path="/admin/pengembalian"
          component={(props) => <Pengembalian {...props} />}
        />
        <Route
          path="/admin/laporan"
          component={(props) => <Laporan {...props} />}
        />
        <Route
          path="/pelanggan/bukulist"
          component={(props) => <BukuList {...props} />}
        />
        <Route
          path="/pelanggan/keranjang"
          component={(props) => <Keranjang {...props} />}
        />
        <Route
          path="/pelanggan/profil"
          component={(props) => <Profil {...props} />}
        />
        <Route path="/login" component={(props) => <Login {...props} />} />
        <Route path="/ubahpassworddefault" component={(props) => <UbahPasswordDefault {...props} />} />
        <Route
          path="/registrasi"
          component={(props) => <Registrasi {...props} />}
        />
        <Route exact path="/" component={(props) => <Dashboard {...props} />} />
        <Route
          path="/pelanggan"
          component={(props) => <DashboardPelanggan {...props} />}
        />
        <Route path="/admin" component={(props) => <Dashboard {...props} />} />
      </Switch>
    );
  }
}

export default Body;
