package com.nexsoft.buku.repository;

import com.nexsoft.buku.model.Cart;
import com.nexsoft.buku.model.CartDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository("CartRepository")
public class CartRepositoryImpl implements CartRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void addCart(Cart cart){
        jdbcTemplate.update("INSERT INTO cart_peminjaman(idCart, idUser) VALUES (?,?)",
                cart.getIdCart(), cart.getIdUser());
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
