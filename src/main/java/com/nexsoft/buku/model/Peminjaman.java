package com.nexsoft.buku.model;

import java.util.List;

public class Peminjaman {
    private String idPinjam;
    private String idUser;
    private String namaUser;
    private String statusUser;
    private String tglPinjam;
    private String tglKembali;
    private int statusPinjam;
    private int denda;
    private int totalData;
    List<PeminjamanDetail> listBuku;

    public Peminjaman(){

    }

    public Peminjaman(String idPinjam, String idUser, String tglPinjam, String tglKembali, int statusPinjam, int denda) {
        this.idPinjam = idPinjam;
        this.idUser = idUser;
        this.tglPinjam = tglPinjam;
        this.tglKembali = tglKembali;
        this.statusPinjam = statusPinjam;
        this.denda = denda;
    }

    public Peminjaman(String idPinjam, String idUser, String namaUser, String statusUser, String tglPinjam, int statusPinjam) {
        this.idPinjam = idPinjam;
        this.idUser = idUser;
        this.namaUser = namaUser;
        this.statusUser = statusUser;
        this.tglPinjam = tglPinjam;
        this.statusPinjam = statusPinjam;
    }

    public Peminjaman(String idPinjam, String idUser, String namaUser, String statusUser, String tglPinjam, String tglKembali, int statusPinjam, int denda) {
        this.idPinjam = idPinjam;
        this.idUser = idUser;
        this.namaUser = namaUser;
        this.statusUser = statusUser;
        this.tglPinjam = tglPinjam;
        this.tglKembali = tglKembali;
        this.statusPinjam = statusPinjam;
        this.denda = denda;
    }



    public Peminjaman(int totalData) {
        this.totalData = totalData;
    }

    public String getStatusUser() {
        return statusUser;
    }

    public void setStatusUser(String statusUser) {
        this.statusUser = statusUser;
    }

    public int getTotalData() {
        return totalData;
    }

    public void setTotalData(int totalData) {
        this.totalData = totalData;
    }

    public String getNamaUser() {
        return namaUser;
    }

    public void setNamaUser(String namaUser) {
        this.namaUser = namaUser;
    }

    public String getIdPinjam() {
        return idPinjam;
    }

    public void setIdPinjam(String idPinjam) {
        this.idPinjam = idPinjam;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public String getTglPinjam() {
        return tglPinjam;
    }

    public void setTglPinjam(String tglPinjam) {
        this.tglPinjam = tglPinjam;
    }

    public String getTglKembali() {
        return tglKembali;
    }

    public void setTglKembali(String tglKembali) {
        this.tglKembali = tglKembali;
    }

    public int getStatusPinjam() {
        return statusPinjam;
    }

    public void setStatusPinjam(int statusPinjam) {
        this.statusPinjam = statusPinjam;
    }

    public int getDenda() {
        return denda;
    }

    public void setDenda(int denda) {
        this.denda = denda;
    }

    @Override
    public String toString() {
        return "Peminjaman{" +
                "idPinjam='" + idPinjam + '\'' +
                ", idUser='" + idUser + '\'' +
                ", namaUser='" + namaUser + '\'' +
                ", statusUser='" + statusUser + '\'' +
                ", tglPinjam='" + tglPinjam + '\'' +
                ", tglKembali='" + tglKembali + '\'' +
                ", statusPinjam=" + statusPinjam +
                ", denda=" + denda +
                ", totalData=" + totalData +
                ", listBuku=" + listBuku +
                '}';
    }

    public List<PeminjamanDetail> getListBuku() {
        return listBuku;
    }

    public void setListBuku(List<PeminjamanDetail> listBuku) {
        this.listBuku = listBuku;
    }


}
