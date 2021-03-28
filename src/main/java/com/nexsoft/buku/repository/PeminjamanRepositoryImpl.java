package com.nexsoft.buku.repository;

import com.nexsoft.buku.model.Peminjaman;
import com.nexsoft.buku.model.PeminjamanDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository("PeminjamanRepository")
public class PeminjamanRepositoryImpl implements PeminjamanRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void save(Peminjaman peminjaman){
        String uuid= String.valueOf(UUID.randomUUID());
        jdbcTemplate.update("INSERT INTO peminjaman(idPinjam, idUser, statusPinjam, denda) VALUES (?,?,?,?)",
                uuid, peminjaman.getIdUser(), 1, 0);

        jdbcTemplate.update("DELETE from cart_peminjaman WHERE idCart=?",peminjaman.getIdUser());
        jdbcTemplate.update("DELETE from cart_detail WHERE idCart=?",peminjaman.getIdUser());

        for (PeminjamanDetail detail : peminjaman.getListBuku()){
            String uuidDetail= String.valueOf(UUID.randomUUID());
            jdbcTemplate.update("INSERT INTO detail_peminjaman (idDetailPinjam, idPinjam, idBuku, biayaSewa, qty)VALUES (?,?,?,?,?)",
                    uuidDetail, uuid, detail.getIdBuku(), detail.getHargaSewa(), detail.getQty());
            jdbcTemplate.update("update buku set stok=stok-1 where idBuku=?",
                    detail.getIdBuku());
        }
    }

    @Override
    public void pengembalianBuku(Peminjaman peminjaman){
        jdbcTemplate.update("UPDATE peminjaman set tglPinjam=tglPinjam, tglKembali=?, statusPinjam=2, denda=?, lamaPinjam=? where idPinjam=?",
                new Date(), peminjaman.getDenda(), peminjaman.getLamaPinjam(), peminjaman.getIdPinjam());

        for (PeminjamanDetail detail : peminjaman.getListBuku()){
            jdbcTemplate.update("update buku set stok=stok+1 where idBuku=?",
                    detail.getIdBuku());
        }
    }

    @Override
    public Peminjaman checkPengembalian(String idUser) {

        return jdbcTemplate.query("SELECT * FROM peminjaman WHERE statusPinjam=1 AND idUser = ?",
                preparedStatement -> {
                    preparedStatement.setString(1, idUser);
                },
                (rs,rowNum)->
                        new Peminjaman(
                                rs.getString("idPinjam"),
                                rs.getString("idUser"),
                                rs.getString("tglPinjam"),
                                rs.getString("tglKembali"),
                                rs.getInt("statusPinjam"),
                                rs.getInt("denda")
                        )).get(0);
    }

    @Override
    public List<Peminjaman> dataPengembalianPaging(int page, int limit) {
        List<Peminjaman> headers;

        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM peminjaman where statusPinjam=1",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page - 1) * limit;

        if(numPages == 0){
            start=0;
            limit=0;
        }

        headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u WHERE p.idUser = u.idUser AND p.statusPinjam=1 LIMIT " + start + "," + limit + ";",
                (rs, rowNum) ->
                        new Peminjaman(
                                rs.getString("idPinjam"),
                                rs.getString("idUser"),
                                rs.getString("namaUser"),
                                rs.getString("role"),
                                rs.getString("tglPinjam"),
                                rs.getInt("statusPinjam")
                        ));

        for (Peminjaman ch : headers){
            List<PeminjamanDetail> details = new ArrayList<>();
            details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '"+ch.getIdPinjam()+"'",
                    (rs, rowNum) ->
                            new PeminjamanDetail(
                                    rs.getString("idDetailPinjam"),
                                    rs.getString("idPinjam"),
                                    rs.getString("idBuku"),
                                    rs.getString("judulBuku"),
                                    rs.getString("jenisBuku"),
                                    rs.getInt("biayaSewa"),
                                    rs.getInt("qty")
                            ));
            ch.setListBuku(details);
        }

        return headers;
    }

    @Override
    public List<Peminjaman> searchPengembalian(String keyword) {
        List<Peminjaman> headers;

        headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u WHERE (u.namaUser LIKE ? OR p.idPinjam LIKE ? OR u.role LIKE ? OR p.tglPinjam LIKE ?) AND p.idUser = u.idUser AND p.statusPinjam=1",
                preparedStatement -> {
                    preparedStatement.setString(1, "%" + keyword + "%");
                    preparedStatement.setString(2, "%" + keyword + "%");
                    preparedStatement.setString(3, "%" + keyword + "%");
                    preparedStatement.setString(4, "%" + keyword + "%");
                },
                (rs, rowNum) ->
                        new Peminjaman(
                                rs.getString("idPinjam"),
                                rs.getString("idUser"),
                                rs.getString("namaUser"),
                                rs.getString("role"),
                                rs.getString("tglPinjam"),
                                rs.getInt("statusPinjam")
                        ));

        for (Peminjaman ch : headers){
            List<PeminjamanDetail> details = new ArrayList<>();
            details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '"+ch.getIdPinjam()+"'",
                    (rs, rowNum) ->
                            new PeminjamanDetail(
                                    rs.getString("idDetailPinjam"),
                                    rs.getString("idPinjam"),
                                    rs.getString("idBuku"),
                                    rs.getString("judulBuku"),
                                    rs.getString("jenisBuku"),
                                    rs.getInt("biayaSewa"),
                                    rs.getInt("qty")
                            ));
            ch.setListBuku(details);
        }

        return headers;
    }

    @Override
    public List<Peminjaman> searchPengembalianPaging(String keyword, int page, int limit) {
        List<Peminjaman> headers;
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM peminjaman where statusPinjam=1",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page - 1) * limit;

        if(numPages == 0){
            start=0;
            limit=0;
        }

        headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u WHERE (u.namaUser LIKE ? OR p.idPinjam LIKE ? OR u.role LIKE ? OR p.tglPinjam LIKE ?) AND p.idUser = u.idUser AND p.statusPinjam=1 LIMIT " + start +"," + limit + ";",
                preparedStatement -> {
                    preparedStatement.setString(1, "%" + keyword + "%");
                    preparedStatement.setString(2, "%" + keyword + "%");
                    preparedStatement.setString(3, "%" + keyword + "%");
                    preparedStatement.setString(4, "%" + keyword + "%");
                },
                (rs, rowNum) ->
                        new Peminjaman(
                                rs.getString("idPinjam"),
                                rs.getString("idUser"),
                                rs.getString("namaUser"),
                                rs.getString("role"),
                                rs.getString("tglPinjam"),
                                rs.getInt("statusPinjam")
                        ));

        for (Peminjaman ch : headers){
            List<PeminjamanDetail> details = new ArrayList<>();
            details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '"+ch.getIdPinjam()+"'",
                    (rs, rowNum) ->
                            new PeminjamanDetail(
                                    rs.getString("idDetailPinjam"),
                                    rs.getString("idPinjam"),
                                    rs.getString("idBuku"),
                                    rs.getString("judulBuku"),
                                    rs.getString("jenisBuku"),
                                    rs.getInt("biayaSewa"),
                                    rs.getInt("qty")
                            ));
            ch.setListBuku(details);
        }

        return headers;
    }

    @Override
    public List<Peminjaman> cetakAllLaporan() {
        List<Peminjaman> headers;

        headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u WHERE p.idUser = u.idUser AND p.statusPinjam=2 ORDER BY p.tglKembali asc",
                (rs, rowNum) ->
                        new Peminjaman(
                                rs.getString("idPinjam"),
                                rs.getString("idUser"),
                                rs.getString("namaUser"),
                                rs.getString("role"),
                                rs.getString("tglPinjam"),
                                rs.getString("tglKembali"),
                                rs.getInt("lamaPinjam"),
                                rs.getInt("statusPinjam"),
                                rs.getInt("denda")
                        ));

        for (Peminjaman ch : headers){
            List<PeminjamanDetail> details = new ArrayList<>();
            details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '"+ch.getIdPinjam()+"'",
                    (rs, rowNum) ->
                            new PeminjamanDetail(
                                    rs.getString("idDetailPinjam"),
                                    rs.getString("idPinjam"),
                                    rs.getString("idBuku"),
                                    rs.getString("judulBuku"),
                                    rs.getString("jenisBuku"),
                                    rs.getInt("biayaSewa"),
                                    rs.getInt("qty")
                            ));
            ch.setListBuku(details);
        }

        return headers;
    }

    @Override
    public List<Peminjaman> riwayatPeminjaman(String idUser) {
        List<Peminjaman> headers;

        headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u WHERE p.idUser = u.idUser AND p.idUser = ? ORDER BY p.tglKembali asc",
                preparedStatement -> {
                    preparedStatement.setString(1, idUser);
                },
                (rs, rowNum) ->
                        new Peminjaman(
                                rs.getString("idPinjam"),
                                rs.getString("idUser"),
                                rs.getString("namaUser"),
                                rs.getString("role"),
                                rs.getString("tglPinjam"),
                                rs.getString("tglKembali"),
                                rs.getInt("statusPinjam"),
                                rs.getInt("denda")
                        ));

        for (Peminjaman ch : headers){
            List<PeminjamanDetail> details = new ArrayList<>();
            details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '"+ch.getIdPinjam()+"'",
                    (rs, rowNum) ->
                            new PeminjamanDetail(
                                    rs.getString("idDetailPinjam"),
                                    rs.getString("idPinjam"),
                                    rs.getString("idBuku"),
                                    rs.getString("judulBuku"),
                                    rs.getString("jenisBuku"),
                                    rs.getInt("biayaSewa"),
                                    rs.getInt("qty")
                            ));
            ch.setListBuku(details);
        }

        return headers;
    }

    @Override
    public Peminjaman totalData() {

        return jdbcTemplate.query("SELECT COUNT(*) as totalData FROM peminjaman where statusPinjam=1",
                (rs,rowNum)->
                        new Peminjaman(
                            rs.getInt("totalData")
                        )).get(0);
    }

    @Override
    public List<Peminjaman> dataLaporan(int page, int limit) {
        List<Peminjaman> headers;

        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM peminjaman where statusPinjam=2",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page - 1) * limit;

        if(numPages == 0){
            start=0;
            limit=0;
        }

        headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u WHERE p.idUser = u.idUser AND p.statusPinjam=2 ORDER BY p.tglKembali desc LIMIT " + start + "," + limit + ";",
                (rs, rowNum) ->
                        new Peminjaman(
                                rs.getString("idPinjam"),
                                rs.getString("idUser"),
                                rs.getString("namaUser"),
                                rs.getString("role"),
                                rs.getString("tglPinjam"),
                                rs.getString("tglKembali"),
                                rs.getInt("lamaPinjam"),
                                rs.getInt("statusPinjam"),
                                rs.getInt("denda")
                        ));

        for (Peminjaman ch : headers){
            List<PeminjamanDetail> details = new ArrayList<>();
            details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '"+ch.getIdPinjam()+"'",
                    (rs, rowNum) ->
                            new PeminjamanDetail(
                                    rs.getString("idDetailPinjam"),
                                    rs.getString("idPinjam"),
                                    rs.getString("idBuku"),
                                    rs.getString("judulBuku"),
                                    rs.getString("jenisBuku"),
                                    rs.getInt("biayaSewa"),
                                    rs.getInt("qty")
                            ));
            ch.setListBuku(details);
        }

        return headers;
    }

    @Override
    public Peminjaman totalDataLaporan() {

        return jdbcTemplate.query("SELECT COUNT(*) as totalData FROM peminjaman where statusPinjam=2",
                (rs,rowNum)->
                        new Peminjaman(
                                rs.getInt("totalData")
                        )).get(0);
    }

    @Override
    public List<Peminjaman> filterLaporan(String keyword, String start, String end) {
        List<Peminjaman> headers;

        if(keyword.isEmpty() == true && start.isEmpty() == true && end.isEmpty() == true) {
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u WHERE p.idUser = u.idUser AND p.statusPinjam=2 ORDER BY p.tglKembali desc",
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));

            for (Peminjaman ch : headers) {
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '" + ch.getIdPinjam() + "'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }

        }else if(start.isEmpty() == false && end.isEmpty() == true && keyword.isEmpty()==true){
            System.out.println(start);
            System.out.println(end.isEmpty());
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u WHERE p.idUser = u.idUser AND p.statusPinjam=2 AND p.tglKembali = ? ORDER BY p.tglKembali desc",
                    preparedStatement -> {
                        preparedStatement.setString(1, start);
                    },
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));
            for (Peminjaman ch : headers){
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '"+ch.getIdPinjam()+"'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }

        }else if(start.isEmpty() == true && end.isEmpty() == false && keyword.isEmpty()==true){
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u WHERE p.idUser = u.idUser AND p.statusPinjam=2 AND p.tglKembali = ? ORDER BY p.tglKembali desc",
                    preparedStatement -> {
                        preparedStatement.setString(1, end);
                    },
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));

            for (Peminjaman ch : headers) {
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '" + ch.getIdPinjam() + "'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }

        }else if(start.isEmpty() == true && end.isEmpty() == true && keyword.isEmpty() == false){
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u, detail_peminjaman d, buku b WHERE (u.namaUser LIKE ? OR b.judulBuku LIKE ?) AND p.idPinjam = d.idPinjam AND b.idBuku=d.idBuku AND p.idUser = u.idUser AND p.statusPinjam=2 GROUP BY p.idPinjam ORDER BY p.tglKembali desc",
                    preparedStatement -> {
                        preparedStatement.setString(1, "%" + keyword + "%");
                        preparedStatement.setString(2, "%" + keyword + "%");
                    },
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));

            for (Peminjaman ch : headers) {
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '" + ch.getIdPinjam() + "'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }

        }else if(start.isEmpty() == false && end.isEmpty() == false && keyword.isEmpty() == true){
            System.out.println(start);
            System.out.println(end);
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u WHERE p.idUser = u.idUser AND p.statusPinjam=2 AND p.tglKembali BETWEEN ? AND ? ORDER BY p.tglKembali desc",
                    preparedStatement -> {
                        preparedStatement.setString(1, start);
                        preparedStatement.setString(2, end);
                    },
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));

            for (Peminjaman ch : headers) {
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '" + ch.getIdPinjam() + "'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }

        }else if(start.isEmpty() == false && end.isEmpty() == true && keyword.isEmpty() == false){
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u, detail_peminjaman d, buku b WHERE (u.namaUser LIKE ? OR b.judulBuku LIKE ?) AND p.idPinjam = d.idPinjam AND b.idBuku=d.idBuku AND p.idUser = u.idUser AND p.statusPinjam=2 AND p.tglKembali = ? GROUP BY p.idPinjam ORDER BY p.tglKembali desc",
                    preparedStatement -> {
                        preparedStatement.setString(1, "%" + keyword + "%");
                        preparedStatement.setString(2, "%" + keyword + "%");
                        preparedStatement.setString(3, start);
                    },
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));

            for (Peminjaman ch : headers) {
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '" + ch.getIdPinjam() + "'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }

        }else if(start.isEmpty() == true && end.isEmpty() == false && keyword.isEmpty() == false){
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u, detail_peminjaman d, buku b WHERE (u.namaUser LIKE ? OR b.judulBuku LIKE ?) AND p.idPinjam = d.idPinjam AND b.idBuku=d.idBuku AND p.idUser = u.idUser AND p.statusPinjam=2 AND p.tglKembali = ? GROUP BY p.idPinjam ORDER BY p.tglKembali desc",
                    preparedStatement -> {
                        preparedStatement.setString(1, "%" + keyword + "%");
                        preparedStatement.setString(2, "%" + keyword + "%");
                        preparedStatement.setString(3, end);
                    },
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));

            for (Peminjaman ch : headers) {
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '" + ch.getIdPinjam() + "'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }

        }else{
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u, detail_peminjaman d, buku b WHERE (u.namaUser LIKE ? OR b.judulBuku LIKE ?) AND p.idPinjam = d.idPinjam AND b.idBuku=d.idBuku AND p.idUser = u.idUser AND p.statusPinjam=2 AND p.tglKembali BETWEEN ? AND ? GROUP BY p.idPinjam ORDER BY p.tglKembali desc",
                    preparedStatement -> {
                        preparedStatement.setString(1, "%" + keyword + "%");
                        preparedStatement.setString(2, "%" + keyword + "%");
                        preparedStatement.setString(3, start);
                        preparedStatement.setString(4, end);
                    },
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));

            for (Peminjaman ch : headers) {
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '" + ch.getIdPinjam() + "'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }
        }
       return headers;
    }

    @Override
    public List<Peminjaman> filterLaporanPaging(String keyword, String start, String end, int page, int limit) {
        List<Peminjaman> headers;
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM peminjaman where statusPinjam=2",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int startPage = (page - 1) * limit;

        if(numPages == 0){
            startPage=0;
            limit=0;
        }

        if(keyword.isEmpty() == true && start.isEmpty() == true && end.isEmpty() == true) {
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u WHERE p.idUser = u.idUser AND p.statusPinjam=2 ORDER BY p.tglKembali desc LIMIT " + startPage +"," + limit +";",
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));

            for (Peminjaman ch : headers) {
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '" + ch.getIdPinjam() + "'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }

        }else if(start.isEmpty() == false && end.isEmpty() == true && keyword.isEmpty()==true){
            System.out.println(start);
            System.out.println(end.isEmpty());
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u WHERE p.idUser = u.idUser AND p.statusPinjam=2 AND p.tglKembali = ? ORDER BY p.tglKembali desc LIMIT " + startPage +"," + limit +";",
                    preparedStatement -> {
                        preparedStatement.setString(1, start);
                    },
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));
            for (Peminjaman ch : headers){
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '"+ch.getIdPinjam()+"'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }

        }else if(start.isEmpty() == true && end.isEmpty() == false && keyword.isEmpty()==true){
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u WHERE p.idUser = u.idUser AND p.statusPinjam=2 AND p.tglKembali = ? ORDER BY p.tglKembali desc LIMIT " + startPage +"," + limit +";",
                    preparedStatement -> {
                        preparedStatement.setString(1, end);
                    },
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));

            for (Peminjaman ch : headers) {
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '" + ch.getIdPinjam() + "'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }

        }else if(start.isEmpty() == true && end.isEmpty() == true && keyword.isEmpty() == false){
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u, detail_peminjaman d, buku b WHERE (u.namaUser LIKE ? OR b.judulBuku LIKE ?) AND p.idPinjam = d.idPinjam AND b.idBuku=d.idBuku AND p.idUser = u.idUser AND p.statusPinjam=2 GROUP BY p.idPinjam ORDER BY p.tglKembali desc LIMIT " + startPage +"," + limit +";",
                    preparedStatement -> {
                        preparedStatement.setString(1, "%" + keyword + "%");
                        preparedStatement.setString(2, "%" + keyword + "%");
                    },
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));

            for (Peminjaman ch : headers) {
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '" + ch.getIdPinjam() + "'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }

        }else if(start.isEmpty() == false && end.isEmpty() == false && keyword.isEmpty() == true){
            System.out.println(start);
            System.out.println(end);
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u WHERE p.idUser = u.idUser AND p.statusPinjam=2 AND p.tglKembali BETWEEN ? AND ? ORDER BY p.tglKembali desc LIMIT " + startPage +"," + limit +";",
                    preparedStatement -> {
                        preparedStatement.setString(1, start);
                        preparedStatement.setString(2, end);
                    },
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));

            for (Peminjaman ch : headers) {
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '" + ch.getIdPinjam() + "'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }

        }else if(start.isEmpty() == false && end.isEmpty() == true && keyword.isEmpty() == false){
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u, detail_peminjaman d, buku b WHERE (u.namaUser LIKE ? OR b.judulBuku LIKE ?) AND p.idPinjam = d.idPinjam AND b.idBuku=d.idBuku AND p.idUser = u.idUser AND p.statusPinjam=2 AND p.tglKembali = ? GROUP BY p.idPinjam ORDER BY p.tglKembali desc LIMIT " + startPage +"," + limit +";",
                    preparedStatement -> {
                        preparedStatement.setString(1, "%" + keyword + "%");
                        preparedStatement.setString(2, "%" + keyword + "%");
                        preparedStatement.setString(3, start);
                    },
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));

            for (Peminjaman ch : headers) {
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '" + ch.getIdPinjam() + "'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }

        }else if(start.isEmpty() == true && end.isEmpty() == false && keyword.isEmpty() == false){
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u, detail_peminjaman d, buku b WHERE (u.namaUser LIKE ? OR b.judulBuku LIKE ?) AND p.idPinjam = d.idPinjam AND b.idBuku=d.idBuku AND p.idUser = u.idUser AND p.statusPinjam=2 AND p.tglKembali = ? GROUP BY p.idPinjam ORDER BY p.tglKembali desc LIMIT " + startPage +"," + limit +";",
                    preparedStatement -> {
                        preparedStatement.setString(1, "%" + keyword + "%");
                        preparedStatement.setString(2, "%" + keyword + "%");
                        preparedStatement.setString(3, end);
                    },
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));

            for (Peminjaman ch : headers) {
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '" + ch.getIdPinjam() + "'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }

        }else{
            headers = jdbcTemplate.query("select u.*, p.* from peminjaman p, users u, detail_peminjaman d, buku b WHERE (u.namaUser LIKE ? OR b.judulBuku LIKE ?) AND p.idPinjam = d.idPinjam AND b.idBuku=d.idBuku AND p.idUser = u.idUser AND p.statusPinjam=2 AND p.tglKembali BETWEEN ? AND ? GROUP BY p.idPinjam ORDER BY p.tglKembali desc LIMIT " + startPage +"," + limit +";",
                    preparedStatement -> {
                        preparedStatement.setString(1, "%" + keyword + "%");
                        preparedStatement.setString(2, "%" + keyword + "%");
                        preparedStatement.setString(3, start);
                        preparedStatement.setString(4, end);
                    },
                    (rs, rowNum) ->
                            new Peminjaman(
                                    rs.getString("idPinjam"),
                                    rs.getString("idUser"),
                                    rs.getString("namaUser"),
                                    rs.getString("role"),
                                    rs.getString("tglPinjam"),
                                    rs.getString("tglKembali"),
                                    rs.getInt("lamaPinjam"),
                                    rs.getInt("statusPinjam"),
                                    rs.getInt("denda")
                            ));

            for (Peminjaman ch : headers) {
                List<PeminjamanDetail> details = new ArrayList<>();
                details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM peminjaman c,  users u, detail_peminjaman d, buku b, jenisbuku j WHERE c.idUser = u.idUser AND c.idPinjam = d.idPinjam AND b.idJenisBuku = j.idJenisBuku AND b.idBuku = d.idBuku AND d.idPinjam = '" + ch.getIdPinjam() + "'",
                        (rs, rowNum) ->
                                new PeminjamanDetail(
                                        rs.getString("idDetailPinjam"),
                                        rs.getString("idPinjam"),
                                        rs.getString("idBuku"),
                                        rs.getString("judulBuku"),
                                        rs.getString("jenisBuku"),
                                        rs.getInt("biayaSewa"),
                                        rs.getInt("qty")
                                ));
                ch.setListBuku(details);
            }
        }
        return headers;
    }


}
