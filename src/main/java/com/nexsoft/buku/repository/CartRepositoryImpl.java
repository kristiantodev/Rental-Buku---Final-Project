package com.nexsoft.buku.repository;

import com.nexsoft.buku.model.Cart;
import com.nexsoft.buku.model.CartDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository("CartRepository")
public class CartRepositoryImpl implements CartRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void addCart(Cart cart){
        jdbcTemplate.update("INSERT INTO cart_peminjaman(idCart, idUser) VALUES (?,?)",
                cart.getIdCart(), cart.getIdUser());
    }

    public void isiKeranjang(CartDetail detail){
        String uuid= String.valueOf(UUID.randomUUID());
        jdbcTemplate.update("INSERT INTO cart_detail(idDetail, idCart, idBuku, qty) VALUES (?,?,?,?)",
                uuid,  detail.getIdCart(), detail.getIdBuku(), 1);
    }

    public List<CartDetail> getIsiKeranjang(String idCart) {
        return jdbcTemplate.query("SELECT * FROM cart_detail WHERE idCart=?",
                preparedStatement -> {
                    preparedStatement.setString(1, idCart);
                },
                (rs,rowNum)->
                        new CartDetail(
                                rs.getString("idDetail"),
                                rs.getString("idCart"),
                                rs.getString("idBuku"),
                                rs.getString("qty")
                        ));
    }

    public CartDetail checkIsiKeranjang(String idCart, String idBuku) {
        return jdbcTemplate.query("SELECT * FROM cart_detail WHERE idCart=? AND idBuku=?",
                preparedStatement -> {
                    preparedStatement.setString(1, idCart);
                    preparedStatement.setString(2, idBuku);
                },
                (rs,rowNum)->
                        new CartDetail(
                                rs.getString("idDetail"),
                                rs.getString("idCart"),
                                rs.getString("idBuku"),
                                rs.getString("qty")
                        )).get(0);
    }

    public void deleteDetailById(String id){
        jdbcTemplate.update("DELETE from cart_detail WHERE idDetail=?",id);
    }

    public Cart findById(String idCart) {
        return jdbcTemplate.query("SELECT c.*, u.namaUser FROM cart_peminjaman c, users u WHERE c.idUser = u.idUser AND c.idCart = ?",
                preparedStatement -> {
                    preparedStatement.setString(1, idCart);
                },
                (rs,rowNum)->
                        new Cart(
                                rs.getString("idCart"),
                                rs.getString("idUser"),
                                rs.getString("namaUser"),
                                rs.getString("tglPinjam")
                        )).get(0);
    }

    public Cart listPeminjaman(String idCart) {
        Cart cart;
        cart = jdbcTemplate.query("SELECT c.*, u.namaUser FROM cart_peminjaman c, users u WHERE c.idUser = u.idUser AND c.idCart = ?",
                preparedStatement -> {
                    preparedStatement.setString(1, idCart);
                },
                (rs, rowNum)->
                        new Cart(
                                rs.getString("idCart"),
                                rs.getString("idUser"),
                                rs.getString("namaUser"),
                                rs.getString("tglPinjam")
                        )).get(0);


            List<CartDetail> details = new ArrayList<>();
            details = jdbcTemplate.query("SELECT c.*, d.*, b.*, j.* FROM cart_peminjaman c, cart_detail d, buku b, jenisbuku j WHERE c.idCart = d.idCart AND b.idJenisBuku = j.idJenisBuku AND d.idBuku = b.idBuku AND c.idCart = ?",
                    preparedStatement -> {
                        preparedStatement.setString(1, idCart);
                    },
                    (rs, rowNum) ->
                            new CartDetail(
                                    rs.getString("idDetail"),
                                    rs.getString("idBuku"),
                                    rs.getString("judulBuku"),
                                    rs.getString("jenisBuku"),
                                    rs.getString("qty"),
                                    rs.getInt("hargaSewa")
                            ));
            cart.setListBuku(details);

        return cart;
    }

    public void deleteById(String id){
        jdbcTemplate.update("DELETE from cart_peminjaman WHERE idCart=?",id);
        jdbcTemplate.update("DELETE from cart_detail WHERE idCart=?",id);
    }

}
