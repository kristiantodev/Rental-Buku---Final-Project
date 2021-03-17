package com.nexsoft.buku.model;

public class PeminjamanDetail {
    private String idDetailPinjam;
    private String idPinjam;
    private String idBuku;
    private String judulBuku;
    private String jenisBuku;
    private int hargaSewa;
    private int qty;

    public PeminjamanDetail(String idDetailPinjam, String idPinjam, String idBuku, String judulBuku, String jenisBuku, int hargaSewa, int qty) {
        this.idDetailPinjam = idDetailPinjam;
        this.idPinjam = idPinjam;
        this.idBuku = idBuku;
        this.judulBuku = judulBuku;
        this.jenisBuku = jenisBuku;
        this.hargaSewa = hargaSewa;
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

    public String getIdDetailPinjam() {
        return idDetailPinjam;
    }

    public void setIdDetailPinjam(String idDetailPinjam) {
        this.idDetailPinjam = idDetailPinjam;
    }

    public String getIdPinjam() {
        return idPinjam;
    }

    public void setIdPinjam(String idPinjam) {
        this.idPinjam = idPinjam;
    }

    public String getIdBuku() {
        return idBuku;
    }

    public void setIdBuku(String idBuku) {
        this.idBuku = idBuku;
    }

    public int getHargaSewa() {
        return hargaSewa;
    }

    public void setHargaSewa(int hargaSewa) {
        this.hargaSewa = hargaSewa;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    @Override
    public String toString() {
        return "PeminjamanDetail{" +
                "idDetailPinjam='" + idDetailPinjam + '\'' +
                ", idPinjam='" + idPinjam + '\'' +
                ", idBuku='" + idBuku + '\'' +
                ", judulBuku='" + judulBuku + '\'' +
                ", jenisBuku='" + jenisBuku + '\'' +
                ", hargaSewa=" + hargaSewa +
                ", qty=" + qty +
                '}';
    }
}
