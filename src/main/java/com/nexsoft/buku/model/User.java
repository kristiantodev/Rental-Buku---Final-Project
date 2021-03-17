package com.nexsoft.buku.model;

public class User {
    private String idUser;
    private String username;
    private String password;
    private String namaUser;
    private String alamat;
    private String phone;
    private String email;
    private String tglRegistrasi;
    private String role;

    public User() {

    }

    public User(String idUser, String username, String password, String namaUser, String alamat, String phone, String email, String tglRegistrasi, String role) {
        this.idUser = idUser;
        this.username = username;
        this.password = password;
        this.namaUser = namaUser;
        this.alamat = alamat;
        this.phone = phone;
        this.email = email;
        this.tglRegistrasi = tglRegistrasi;
        this.role = role;
    }

    public User(String idUser, String username, String namaUser, String alamat, String phone, String email, String tglRegistrasi, String role) {
        this.idUser = idUser;
        this.username = username;
        this.namaUser = namaUser;
        this.alamat = alamat;
        this.phone = phone;
        this.email = email;
        this.tglRegistrasi = tglRegistrasi;
        this.role = role;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNamaUser() {
        return namaUser;
    }

    public void setNamaUser(String namaUser) {
        this.namaUser = namaUser;
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTglRegistrasi() {
        return tglRegistrasi;
    }

    public void setTglRegistrasi(String tglRegistrasi) {
        this.tglRegistrasi = tglRegistrasi;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "idUser='" + idUser + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", namaUser='" + namaUser + '\'' +
                ", alamat='" + alamat + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", tglRegistrasi='" + tglRegistrasi + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
