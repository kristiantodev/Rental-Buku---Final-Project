package com.nexsoft.buku.controller;

import com.nexsoft.buku.model.Cart;
import com.nexsoft.buku.model.CartDetail;
import com.nexsoft.buku.service.CartService;
import com.nexsoft.buku.util.CustomErrorType;
import com.nexsoft.buku.util.CustomSuccessType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CartController {
    public static final Logger logger = LoggerFactory.getLogger(CartController.class);
    @Autowired
    CartService cartService;

    @PostMapping("/cart/")
    public ResponseEntity<?> createCart (@RequestBody Cart cart){
        try{
            cartService.addCart(cart);
            return new ResponseEntity<>("Cart berhasil ditambah !!", HttpStatus.CREATED);
    }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new CustomErrorType("Gagal menambahkan cart peminjaman"), HttpStatus.BAD_REQUEST);
        }

}

    @PostMapping("/isicartdetail/")
    public ResponseEntity<?> createCartDetail (@RequestBody CartDetail detail){

        try{
            if (cartService.checkIsiKeranjang(detail)) {
                return new ResponseEntity<>(new CustomErrorType("Gagal !!. Buku dengan ID " +
                        detail.getIdBuku() + " sudah ada di Keranjang. Silahkan masukan buku lain..."), HttpStatus.CONFLICT);
            }else{
                cartService.isiKeranjang(detail);
                return new ResponseEntity<>(new CustomSuccessType("Buku dengan ID "+detail.getIdBuku()+" Berhasil dimasukan ke Keranjang..."), HttpStatus.CREATED);
            }

        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new CustomErrorType("Gagal menambahkan buku ke keranjang"), HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/lihatisikeranjang/")
    public ResponseEntity<?> isiKeranjang(@RequestParam String idCart) {
        logger.info("Comparing data!");

        List<CartDetail> isi = cartService.getIsiKeranjang(idCart);
        return new ResponseEntity<>(isi, HttpStatus.OK);
    }

    @DeleteMapping("/hapusisikeranjang/{id}")
    public ResponseEntity<?> deleteDetail(@PathVariable("id") String  id) {
        logger.info("Fetching & deleting cart detail with id {}", id);

        cartService.deleteDetailById(id);
        return new ResponseEntity<>(new CustomSuccessType("Buku berhasil dihapus dari keranjang !!"), HttpStatus.OK);
    }

    @GetMapping("/cart/")
    public ResponseEntity<?> cartGet(@RequestParam String idCart) {
        logger.info("Comparing data!");
        Cart cart = cartService.findById(idCart);
        return new ResponseEntity<>(cart, HttpStatus.OK);

    }

    @GetMapping("/peminjaman/")
    public ResponseEntity<?> cartPeminjaman(@RequestParam String idCart) {
        logger.info("Comparing data!");
        Cart cart = cartService.listPeminjaman(idCart);
        if (cart == null) {
            logger.error("ID Cart tidak ditemukan !!");
            return new ResponseEntity<>(new CustomErrorType("ID Cart tidak ditemukan !! "),
                    HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cart, HttpStatus.OK);

    }

    @DeleteMapping("/cart/{id}")
    public ResponseEntity<?> deleteCart(@PathVariable("id") String  id) {
        logger.info("Fetching & deleting cart detail with id {}", id);

        cartService.deleteById(id);
        return new ResponseEntity<>(new CustomSuccessType("Peminjaman dibatalkan... semua buku dikeranjang terhapus..."), HttpStatus.OK);
    }

}
