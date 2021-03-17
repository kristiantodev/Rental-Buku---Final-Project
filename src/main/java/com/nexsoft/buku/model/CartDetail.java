package com.nexsoft.buku.model;

import java.util.List;

public class CartDetail {
    private String idDetail;
    private String idCart;
    private String idBuku;
    private String judulBuku;
    private String jenisBuku;
    private String qty;
    private int hargaSewa;

    public CartDetail(){

    }

    public CartDetail(String idDetail, String idCart, String idBuku, String qty) {
        this.idDetail = idDetail;
        this.idCart = idCart;
        this.idBuku = idBuku;
        this.qty = qty;
    }

    public CartDetail(String idDetail, String idBuku, String judulBuku, String jenisBuku, String qty, int hargaSewa) {
        this.idDetail = idDetail;
        this.idBuku = idBuku;
        this.judulBuku = judulBuku;
        this.jenisBuku = jenisBuku;
        this.qty = qty;
        this.hargaSewa = hargaSewa;
    }

    public String getIdDetail() {
        return idDetail;
    }

    public void setIdDetail(String idDetail) {
        this.idDetail = idDetail;
    }

    public String getIdCart() {
        return idCart;
    }

    public void setIdCart(String idCart) {
        this.idCart = idCart;
    }

    public String getIdBuku() {
        return idBuku;
    }

    public void setIdBuku(String idBuku) {
        this.idBuku = idBuku;
    }

    public String getQty() {
        return qty;
    }

    public void setQty(String qty) {
        this.qty = qty;
    }

    public String getJudulBuku() {
        return judulBuku;
    }

    public void setJudulBuku(String judulBuku) {
        this.judulBuku = judulBuku;
    }

    public String getJenisBuku() {
        return jenisBuku;
    }

    public void setJenisBuku(String jenisBuku) {
        this.jenisBuku = jenisBuku;
    }

    public int getHargaSewa() {
        return hargaSewa;
    }

    public void setHargaSewa(int hargaSewa) {
        this.hargaSewa = hargaSewa;
    }

    @Override
    public String toString() {
        return "CartDetail{" +
                "idDetail='" + idDetail + '\'' +
                ", idCart='" + idCart + '\'' +
                ", idBuku='" + idBuku + '\'' +
                ", judulBuku='" + judulBuku + '\'' +
                ", jenisBuku='" + jenisBuku + '\'' +
                ", qty='" + qty + '\'' +
                ", hargaSewa=" + hargaSewa +
                '}';
    }
}
