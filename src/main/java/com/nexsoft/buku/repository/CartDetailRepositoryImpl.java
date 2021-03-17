package com.nexsoft.buku.repository;

import com.nexsoft.buku.model.CartDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository("CartDetailRepository")
public class CartDetailRepositoryImpl implements CartDetailRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void addCartDetail(CartDetail detail){
        String uuid= String.valueOf(UUID.randomUUID());
        jdbcTemplate.update("INSERT INTO cart_detail(idDetail, idCart, idBuku, qty) VALUES (?,?,?,?)",
                uuid,  detail.getIdCart(), detail.getIdBuku(), detail.getQty());
        jdbcTemplate.update("update buku set stok=stok-1 where idBuku=?",
                detail.getIdBuku());
    }

    public CartDetail checkBuku(String idCart, String idBuku) {
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

    public void deleteById(String id){
        jdbcTemplate.update("DELETE from cart_detail WHERE idDetail=?",id);
    }

    public void tambahStokBuku(String idBuku){
        jdbcTemplate.update("update buku set stok=stok+1 where idBuku=?",
                idBuku);
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

}
