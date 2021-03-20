package com.nexsoft.buku.repository;

import com.nexsoft.buku.model.Grafik;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("GrafikRepository")
public class GrafikRepositoryImpl implements  GrafikRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Grafik> pelangganTeraktif(){
        return jdbcTemplate.query("select u.namauser, count(*) as total from users u, peminjaman j where u.idUser=j.idUser GROUP BY u.idUser order by total desc limit 3"
                ,
                (rs,rowNum)->
                        new Grafik(
                                rs.getString("namaUser"),
                                rs.getInt("total")
                        ));
    }

    public List<Grafik> pelangganTeraktifFilter(int bulan, int tahun){
        return jdbcTemplate.query("select u.namauser, count(*) as total from users u, peminjaman j where u.idUser=j.idUser AND MONTH(j.tglKembali) = ? AND YEAR(j.tglKembali) = ? GROUP BY u.idUser order by total desc limit 3"
                ,
                preparedStatement -> {
                    preparedStatement.setInt(1, bulan);
                    preparedStatement.setInt(2, tahun);
                },
                (rs,rowNum)->
                        new Grafik(
                                rs.getString("namaUser"),
                                rs.getInt("total")
                        ));
    }

    public List<Grafik> bukuPopuler(){
        return jdbcTemplate.query("select b.judulBuku, count(*) as total from detail_peminjaman d, buku b where d.idBuku=b.idBuku GROUP BY d.idBuku order by total desc LIMIT 5;"
                ,
                (rs,rowNum)->
                        new Grafik(
                                rs.getString("judulBuku"),
                                rs.getInt("total")
                        ));
    }

    public List<Grafik> bukuPopulerFilter(int bulan, int tahun){
        return jdbcTemplate.query("select b.judulBuku, count(*) as total from detail_peminjaman d, buku b, peminjaman p where d.idBuku=b.idBuku AND p.idPinjam=d.idPinjam AND MONTH(p.tglKembali) = ? AND YEAR(p.tglKembali) = ?  GROUP BY d.idBuku order by total desc LIMIT 5;"
                ,
                preparedStatement -> {
                    preparedStatement.setInt(1, bulan);
                    preparedStatement.setInt(2, tahun);
                },
                (rs,rowNum)->
                        new Grafik(
                                rs.getString("judulBuku"),
                                rs.getInt("total")
                        ));
    }

    public List<Grafik> allPendapatan(){
        return jdbcTemplate.query("select p.tglKembali, sum(d.biayaSewa)+p.denda as total from peminjaman p, detail_peminjaman d where p.idPinjam = d.idPinjam AND MONTH(p.tglKembali) = MONTH(NOW()) AND p.statusPinjam=2 GROUP BY p.tglKembali order by p.tglKembali asc"
                ,
                (rs,rowNum)->
                        new Grafik(
                                rs.getString("tglKembali"),
                                rs.getInt("total")
                        ));
    }

    public List<Grafik> allPendapatanFilter(int bulan, int tahun){
        return jdbcTemplate.query("select p.tglKembali, sum(d.biayaSewa)+p.denda as total from peminjaman p, detail_peminjaman d where p.idPinjam = d.idPinjam AND MONTH(p.tglKembali) = ? AND YEAR(p.tglKembali) = ? AND p.statusPinjam=2 GROUP BY p.tglKembali order by p.tglKembali asc"
                ,
                preparedStatement -> {
                    preparedStatement.setInt(1, bulan);
                    preparedStatement.setInt(2, tahun);
                },
                (rs,rowNum)->
                        new Grafik(
                                rs.getString("tglKembali"),
                                rs.getInt("total")
                        ));
    }

    public List<Grafik> pengeluaranPelanggan(String idUser){
        return jdbcTemplate.query("select p.tglKembali, sum(d.biayaSewa) as total from peminjaman p, detail_peminjaman d where p.idPinjam = d.idPinjam AND p.statusPinjam=2 AND MONTH(p.tglKembali) = MONTH(NOW()) AND p.idUser=? GROUP BY p.tglKembali order by p.tglKembali asc"
                ,
                preparedStatement -> {
                    preparedStatement.setString(1, idUser);
                },
                (rs,rowNum)->
                        new Grafik(
                                rs.getString("tglKembali"),
                                rs.getInt("total")
                        ));
    }

    public List<Grafik> pengeluaranPelangganFilter(String idUser, int bulan, int tahun){
        return jdbcTemplate.query("select p.tglKembali, sum(d.biayaSewa) as total from peminjaman p, detail_peminjaman d where p.idPinjam = d.idPinjam AND p.statusPinjam=2 AND MONTH(p.tglKembali) = ? AND YEAR(p.tglKembali) = ? AND p.idUser=? GROUP BY p.tglKembali order by p.tglKembali asc"
                ,
                preparedStatement -> {
                    preparedStatement.setInt(1, bulan);
                    preparedStatement.setInt(2, tahun);
                    preparedStatement.setString(3, idUser);
                },
                (rs,rowNum)->
                        new Grafik(
                                rs.getString("tglKembali"),
                                rs.getInt("total")
                        ));
    }

    public Grafik totalBukuPinjam(String idUser){
        return jdbcTemplate.query("select count(*) as total from peminjaman p, detail_peminjaman d WHERE p.idPinjam = d.idPinjam AND p.statusPinjam=2 AND p.idUser=?"
                ,
                preparedStatement -> {
                    preparedStatement.setString(1, idUser);
                },
                (rs,rowNum)->
                        new Grafik(
                                rs.getInt("total")
                        )).get(0);
    }

    public Grafik totalBukuBelumDikembalikan(String idUser){
        return jdbcTemplate.query("select count(*) as total from peminjaman p, detail_peminjaman d WHERE p.idPinjam = d.idPinjam AND p.statusPinjam=1 AND p.idUser=?"
                ,
                preparedStatement -> {
                    preparedStatement.setString(1, idUser);
                },
                (rs,rowNum)->
                        new Grafik(
                                rs.getInt("total")
                        )).get(0);
    }

    public Grafik totalPengeluaran(String idUser){
        return jdbcTemplate.query("select sum(d.biayaSewa) + (select sum(denda) from peminjaman where idUser=? AND MONTH(tglKembali) = MONTH(NOW())) as total from peminjaman p, detail_peminjaman d where p.idPinjam=d.idPinjam AND p.statusPinjam=2 AND p.idUser=? AND MONTH(p.tglKembali) = MONTH(NOW())"
                ,
                preparedStatement -> {
                    preparedStatement.setString(1, idUser);
                    preparedStatement.setString(2, idUser);
                },
                (rs,rowNum)->
                        new Grafik(
                                rs.getInt("total")
                        )).get(0);
    }

    public Grafik totalPengeluaranFilter(String idUser, int bulan, int tahun){
        return jdbcTemplate.query("select sum(d.biayaSewa) + (select sum(denda) from peminjaman where idUser=? AND MONTH(tglKembali) = ? AND YEAR(tglKembali) = ?) as total from peminjaman p, detail_peminjaman d where p.idPinjam=d.idPinjam AND p.statusPinjam=2 AND p.idUser=? AND MONTH(p.tglKembali) = ? AND YEAR(p.tglkembali) = ?"
                ,
                preparedStatement -> {
                    preparedStatement.setString(1, idUser);
                    preparedStatement.setInt(2, bulan);
                    preparedStatement.setInt(3, tahun);
                    preparedStatement.setString(4, idUser);
                    preparedStatement.setInt(5, bulan);
                    preparedStatement.setInt(6, tahun);
                },
                (rs,rowNum)->
                        new Grafik(
                                rs.getInt("total")
                        )).get(0);
    }

    public Grafik bukuTerpinjam(){
        return jdbcTemplate.query("select count(*) as total from peminjaman p, detail_peminjaman d WHERE p.idPinjam = d.idPinjam AND p.statusPinjam=1",
                (rs,rowNum)->
                        new Grafik(
                                rs.getInt("total")
                        )).get(0);
    }

    public Grafik totalPendapatanRental(){
        return jdbcTemplate.query("select sum(d.biayaSewa) + (select sum(denda) from peminjaman where MONTH(tglKembali) = MONTH(NOW())) as total from peminjaman p, detail_peminjaman d where p.idPinjam=d.idPinjam AND p.statusPinjam=2 AND MONTH(p.tglKembali) = MONTH(NOW())",
                (rs,rowNum)->
                        new Grafik(
                                rs.getInt("total")
                        )).get(0);
    }

    public Grafik totalPendapatanRentalFilter(int bulan, int tahun){
        return jdbcTemplate.query("select sum(d.biayaSewa) + (select sum(denda) from peminjaman where MONTH(tglKembali) = ? AND YEAR(tglKembali) = ?) as total from peminjaman p, detail_peminjaman d where p.idPinjam=d.idPinjam AND p.statusPinjam=2 AND MONTH(p.tglKembali) = ? AND YEAR(p.tglKembali) = ?",
                preparedStatement -> {
                    preparedStatement.setInt(1, bulan);
                    preparedStatement.setInt(2, tahun);
                    preparedStatement.setInt(3, bulan);
                    preparedStatement.setInt(4, tahun);
                },
                (rs,rowNum)->
                        new Grafik(
                                rs.getInt("total")
                        )).get(0);
    }

    public Grafik totalPinjamKomik(String idUser){
        return jdbcTemplate.query("select b.idJenisBuku, count(*) as total from peminjaman p, detail_peminjaman d, buku b where p.idPinjam=d.idPinjam AND b.idBuku=d.idBuku AND b.idJenisBuku='1' AND MONTH(DATE(p.tglPinjam)) = MONTH(NOW()) AND p.idUser=?"
                ,
                preparedStatement -> {
                    preparedStatement.setString(1, idUser);
                },
                (rs,rowNum)->
                        new Grafik(
                                rs.getInt("total")
                        )).get(0);
    }

    public Grafik totalPinjamNovel(String idUser){
        return jdbcTemplate.query("select b.idJenisBuku, count(*) as total from peminjaman p, detail_peminjaman d, buku b where p.idPinjam=d.idPinjam AND b.idBuku=d.idBuku AND b.idJenisBuku='2' AND MONTH(DATE(p.tglPinjam)) = MONTH(NOW()) AND p.idUser=?"
                ,
                preparedStatement -> {
                    preparedStatement.setString(1, idUser);
                },
                (rs,rowNum)->
                        new Grafik(
                                rs.getInt("total")
                        )).get(0);
    }

    public Grafik totalPinjamEnsiklopedia(String idUser){
        return jdbcTemplate.query("select b.idJenisBuku, count(*) as total from peminjaman p, detail_peminjaman d, buku b where p.idPinjam=d.idPinjam AND b.idBuku=d.idBuku AND b.idJenisBuku='3' AND MONTH(DATE(p.tglPinjam)) = MONTH(NOW()) AND p.idUser=?"
                ,
                preparedStatement -> {
                    preparedStatement.setString(1, idUser);
                },
                (rs,rowNum)->
                        new Grafik(
                                rs.getInt("total")
                        )).get(0);
    }

}
