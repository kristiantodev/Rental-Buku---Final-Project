package com.nexsoft.buku.model;

public class JenisBuku {
    private int idJenisBuku;
    private String jenisBuku;

    public JenisBuku(int idJenisBuku, String jenisBuku) {
        this.idJenisBuku = idJenisBuku;
        this.jenisBuku = jenisBuku;
    }

    public int getIdJenisBuku() {
        return idJenisBuku;
    }

    public void setIdJenisBuku(int idJenisBuku) {
        this.idJenisBuku = idJenisBuku;
    }

    public String getJenisBuku() {
        return jenisBuku;
    }

    public void setJenisBuku(String jenisBuku) {
        this.jenisBuku = jenisBuku;
    }

    @Override
    public String toString() {
        return "JenisBuku{" +
                "idJenisBuku=" + idJenisBuku +
                ", jenisBuku='" + jenisBuku + '\'' +
                '}';
    }
}
