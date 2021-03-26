package com.nexsoft.buku.repository;

import com.nexsoft.buku.model.Buku;
import com.nexsoft.buku.model.JenisBuku;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("BukuRepository")
public class BukuRepositoryImpl implements BukuRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;


    public List<Buku> getDataBuku(){
        return jdbcTemplate.query("select b.*, j.jenisBuku from buku b, jenisbuku j WHERE b.idJenisBuku = j.idJenisBuku order by b.isActive asc, b.judulBuku asc"
                        ,
                (rs,rowNum)->
                        new Buku(
                                rs.getString("idBuku"),
                                rs.getString("judulBuku"),
                                rs.getString("pengarang"),
                                rs.getInt("idJenisBuku"),
                                rs.getString("jenisBuku"),
                                rs.getInt("hargaSewa"),
                                rs.getInt("stok"),
                                rs.getInt("isActive"),
                                rs.getString("keterangan")
                        ));
    }

    public List<JenisBuku> getDataJenisBuku(){
        return jdbcTemplate.query("select*from jenisbuku"
                ,
                (rs,rowNum)->
                        new JenisBuku(
                                rs.getInt("idJenisBuku"),
                                rs.getString("jenisBuku")
                        ));
    }

    public void updateStatus(Buku buku){
        jdbcTemplate.update("UPDATE buku SET isActive = "+buku.getIsActive()+" WHERE idBuku = '"+buku.getIdBuku()+"'");
    }

    public List<Buku> serchingBuku(String keyword){
        return jdbcTemplate.query("select b.*, j.jenisBuku from buku b, jenisbuku j WHERE (b.idBuku LIKE ? OR b.judulBuku LIKE ?" +
                        "OR b.pengarang LIKE ? OR b.hargaSewa LIKE ? OR b.stok LIKE ? OR j.jenisBuku LIKE ?) AND b.idJenisBuku = j.idJenisBuku order by b.isActive asc, b.judulBuku asc",
                preparedStatement -> {
                    preparedStatement.setString(1, "%" + keyword + "%");
                    preparedStatement.setString(2, "%" + keyword + "%");
                    preparedStatement.setString(3, "%" + keyword + "%");
                    preparedStatement.setString(4, "%" + keyword + "%");
                    preparedStatement.setString(5, "%" + keyword + "%");
                    preparedStatement.setString(6, "%" + keyword + "%");
                },
                (rs,rowNum)->
                        new Buku(
                                rs.getString("idBuku"),
                                rs.getString("judulBuku"),
                                rs.getString("pengarang"),
                                rs.getInt("idJenisBuku"),
                                rs.getString("jenisBuku"),
                                rs.getInt("hargaSewa"),
                                rs.getInt("stok"),
                                rs.getInt("isActive"),
                                rs.getString("keterangan")
                        ));
    }

    public List<Buku> searchWithPaging(int page, int limit, String keyword) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM buku",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;

        int start = (page - 1) * limit;

        return jdbcTemplate.query("select b.*, j.jenisBuku from buku b, jenisbuku j WHERE (b.idBuku LIKE ? OR b.judulBuku LIKE ?" +
                        "OR b.pengarang LIKE ? OR b.hargaSewa LIKE ? OR b.stok LIKE ? OR j.jenisBuku LIKE ?) AND b.idJenisBuku = j.idJenisBuku order by b.isActive asc, b.judulBuku asc LIMIT " + start +"," + limit + ";",
                preparedStatement -> {
                    preparedStatement.setString(1, "%" + keyword + "%");
                    preparedStatement.setString(2, "%" + keyword + "%");
                    preparedStatement.setString(3, "%" + keyword + "%");
                    preparedStatement.setString(4, "%" + keyword + "%");
                    preparedStatement.setString(5, "%" + keyword + "%");
                    preparedStatement.setString(6, "%" + keyword + "%");
                },
                (rs,rowNum)->
                        new Buku(
                                rs.getString("idBuku"),
                                rs.getString("judulBuku"),
                                rs.getString("pengarang"),
                                rs.getInt("idJenisBuku"),
                                rs.getString("jenisBuku"),
                                rs.getInt("hargaSewa"),
                                rs.getInt("stok"),
                                rs.getInt("isActive"),
                                rs.getString("keterangan")
                        ));
    }

    public List<Buku> findWithPaging(int page, int limit) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM buku",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;

        int start = (page - 1) * limit;

        return jdbcTemplate.query("select b.*, j.jenisBuku from buku b, jenisbuku j WHERE b.idJenisBuku = j.idJenisBuku order by b.isActive asc, b.judulBuku asc LIMIT " + start + "," + limit + ";",
                (rs, rowNum) ->
                        new Buku(
                                rs.getString("idBuku"),
                                rs.getString("judulBuku"),
                                rs.getString("pengarang"),
                                rs.getInt("idJenisBuku"),
                                rs.getString("jenisBuku"),
                                rs.getInt("hargaSewa"),
                                rs.getInt("stok"),
                                rs.getInt("isActive"),
                                rs.getString("keterangan")
                        ));
    }

    public void deleteById(String id){
        jdbcTemplate.update("DELETE from buku WHERE idBuku=?",id);
    }

    public void addBuku(Buku buku){
        jdbcTemplate.update("INSERT INTO buku(idBuku, judulbuku, pengarang, idJenisBuku, hargaSewa, stok, isActive, keterangan) VALUES (?,?,?,?,?,?,?,?)",
                buku.getIdBuku(), buku.getJudulBuku(), buku.getPengarang(), buku.getIdJenisBuku(), buku.getHargaSewa(), buku.getStok(), 1, buku.getKeterangan());
    }

    public void updateBuku(Buku buku){
        jdbcTemplate.update(
                "UPDATE buku SET judulBuku = ?, pengarang = ?, idJenisBuku = ?, hargaSewa = ?, stok = ?, keterangan = ? WHERE idBuku = ?",
                buku.getJudulBuku(), buku.getPengarang(), buku.getIdJenisBuku(), buku.getHargaSewa(), buku.getStok(), buku.getKeterangan(), buku.getIdBuku()
        );
    }

    public Buku findById(String idBuku) {

        return jdbcTemplate.query("SELECT * FROM buku WHERE idBuku = ?",
                preparedStatement -> {
                    preparedStatement.setString(1, idBuku);
                },
                (rs,rowNum)->
                        new Buku(
                                rs.getString("idBuku"),
                                rs.getInt("stok"),
                                rs.getInt("isActive")
                        )).get(0);
    }

    public Buku findByJudul(String judulBuku) {

        return jdbcTemplate.query("SELECT * FROM buku WHERE judulBuku = ?",
                preparedStatement -> {
                    preparedStatement.setString(1, judulBuku);
                },
                (rs,rowNum)->
                        new Buku(

                        )).get(0);
    }

    public Buku findByJudulEdit(String idBuku, String judulBuku) {

        return jdbcTemplate.query("SELECT * FROM buku WHERE judulBuku = ? AND idBuku <> ?",
                preparedStatement -> {
                    preparedStatement.setString(1, judulBuku);
                    preparedStatement.setString(2, idBuku);
                },
                (rs,rowNum)->
                        new Buku(
                        )).get(0);
    }

}
