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

    public List<Grafik> bukuPopuler(){
        return jdbcTemplate.query("select b.judulBuku, count(*) as total from detail_peminjaman d, buku b where d.idBuku=b.idBuku GROUP BY d.idBuku order by total desc LIMIT 5;"
                ,
                (rs,rowNum)->
                        new Grafik(
                                rs.getString("judulBuku"),
                                rs.getInt("total")
                        ));
    }

    public List<Grafik> allPendapatan(){
        return jdbcTemplate.query("select p.tglKembali, sum(d.biayaSewa) as total from peminjaman p, detail_peminjaman d where p.idPinjam = d.idPinjam AND MONTH(p.tglKembali) = MONTH(NOW()) AND p.statusPinjam=2 GROUP BY p.tglKembali order by p.tglKembali asc"
                ,
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
        return jdbcTemplate.query("select sum(d.biayaSewa) + (select sum(denda) from peminjaman where idUser=?) as total from peminjaman p, detail_peminjaman d where p.idPinjam=d.idPinjam AND p.statusPinjam=2 AND p.idUser=?"
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

    public Grafik bukuTerpinjam(){
        return jdbcTemplate.query("select count(*) as total from peminjaman p, detail_peminjaman d WHERE p.idPinjam = d.idPinjam AND p.statusPinjam=2",
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

}
