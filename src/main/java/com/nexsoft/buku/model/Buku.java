package com.nexsoft.buku.model;

public class Buku {
    private String idBuku;
    private String judulBuku;
    private String pengarang;
    private int idJenisBuku;
    private String jenisBuku;
    private int hargaSewa;
    private int stok;
    private String keterangan;

    public Buku() {

    }

    public Buku(String idBuku, String judulBuku, String pengarang, int idJenisBuku, String jenisBuku, int hargaSewa, int stok, String keterangan) {
        this.idBuku = idBuku;
        this.judulBuku = judulBuku;
        this.pengarang = pengarang;
        this.idJenisBuku = idJenisBuku;
        this.jenisBuku = jenisBuku;
        this.hargaSewa = hargaSewa;
        this.stok = stok;
        this.keterangan = keterangan;
    }

    public Buku(String idBuku, String judulBuku, String pengarang, int idJenisBuku, int hargaSewa, int stok, String keterangan) {
        this.idBuku = idBuku;
        this.judulBuku = judulBuku;
        this.pengarang = pengarang;
        this.idJenisBuku = idJenisBuku;
        this.hargaSewa = hargaSewa;
        this.stok = stok;
        this.keterangan = keterangan;
    }

    public String getJenisBuku() {
        return jenisBuku;
    }

    public void setJenisBuku(String jenisBuku) {
        this.jenisBuku = jenisBuku;
    }

    public String getIdBuku() {
        return idBuku;
    }

    public void setIdBuku(String idBuku) {
        this.idBuku = idBuku;
    }

    public String getJudulBuku() {
        return judulBuku;
    }

    public void setJudulBuku(String judulBuku) {
        this.judulBuku = judulBuku;
    }

    public String getPengarang() {
        return pengarang;
    }

    public void setPengarang(String pengarang) {
        this.pengarang = pengarang;
    }

    public int getIdJenisBuku() {
        return idJenisBuku;
    }

    public void setIdJenisBuku(int idJenisBuku) {
        this.idJenisBuku = idJenisBuku;
    }

    public int getHargaSewa() {
        return hargaSewa;
    }

    public void setHargaSewa(int hargaSewa) {
        this.hargaSewa = hargaSewa;
    }

    public int getStok() {
        return stok;
    }

    public void setStok(int stok) {
        this.stok = stok;
    }

    public String getKeterangan() {
        return keterangan;
    }

    public void setKeterangan(String keterangan) {
        this.keterangan = keterangan;
    }

    @Override
    public String toString() {
        return "Buku{" +
                "idBuku='" + idBuku + '\'' +
                ", judulBuku='" + judulBuku + '\'' +
                ", pengarang='" + pengarang + '\'' +
                ", idJenisBuku=" + idJenisBuku +
                ", jenisBuku='" + jenisBuku + '\'' +
                ", hargaSewa=" + hargaSewa +
                ", stok=" + stok +
                ", keterangan='" + keterangan + '\'' +
                '}';
    }


}
