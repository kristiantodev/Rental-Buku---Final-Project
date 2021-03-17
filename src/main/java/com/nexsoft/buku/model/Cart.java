package com.nexsoft.buku.model;

import java.util.List;

public class Cart {
    private String idCart;
    private String idUser;
    private String namaUser;
    private String tglPinjam;
    List<CartDetail> listBuku;

    public Cart() {

    }

    public Cart(String idCart, String idUser, String tglPinjam) {
        this.idCart = idCart;
        this.idUser = idUser;
        this.tglPinjam = tglPinjam;
    }

    public Cart(String idCart, String idUser, String namaUser, String tglPinjam) {
        this.idCart = idCart;
        this.idUser = idUser;
        this.namaUser = namaUser;
        this.tglPinjam = tglPinjam;
    }

    public String getIdCart() {
        return idCart;
    }

    public void setIdCart(String idCart) {
        this.idCart = idCart;
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

    public String getNamaUser() {
        return namaUser;
    }

    public void setNamaUser(String namaUser) {
        this.namaUser = namaUser;
    }

    public List<CartDetail> getListBuku() {
        return listBuku;
    }

    public void setListBuku(List<CartDetail> listBuku) {
        this.listBuku = listBuku;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "idCart='" + idCart + '\'' +
                ", idUser='" + idUser + '\'' +
                ", namaUser='" + namaUser + '\'' +
                ", tglPinjam='" + tglPinjam + '\'' +
                ", listBuku=" + listBuku +
                '}';
    }
}
