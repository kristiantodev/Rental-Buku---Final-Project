package com.nexsoft.buku.controller;

import com.nexsoft.buku.model.CartDetail;
import com.nexsoft.buku.service.CartDetailService;
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
public class CartDetailController {
    public static final Logger logger = LoggerFactory.getLogger(CartDetailController.class);
    @Autowired
    CartDetailService cartDetailService;

    @PostMapping("/cartdetail/")
    public ResponseEntity<?> createCart (@RequestBody CartDetail detail){

        try{
            if (cartDetailService.checkBuku(detail)) {
                return new ResponseEntity<>(new CustomErrorType("Gagal !!. Buku dengan ID " +
                        detail.getIdBuku() + " sudah ada di Keranjang. Silahkan masukan buku lain..."), HttpStatus.CONFLICT);
            }else{
                cartDetailService.addCartDetail(detail);
                return new ResponseEntity<>(new CustomSuccessType("Buku dengan ID "+detail.getIdBuku()+" Berhasil dimasukan ke Keranjang..."), HttpStatus.CREATED);
            }

    }catch (Exception e){
        e.printStackTrace();
        return new ResponseEntity<>(new CustomErrorType("Gagal menambahkan buku ke keranjang"), HttpStatus.BAD_REQUEST);
    }

}

    @GetMapping("/isikeranjang/")
    public ResponseEntity<?> isiKeranjang(@RequestParam String idCart) {
        logger.info("Comparing data!");

        List<CartDetail> isi = cartDetailService.getIsiKeranjang(idCart);
        return new ResponseEntity<>(isi, HttpStatus.OK);
    }

    @DeleteMapping("/cartdetail/{id}")
    public ResponseEntity<?> deleteDetail(@PathVariable("id") String  id) {
        logger.info("Fetching & deleting cart detail with id {}", id);

        cartDetailService.deleteById(id);
        return new ResponseEntity<>(new CustomSuccessType("Buku berhasil dihapus dari keranjang !!"), HttpStatus.OK);
    }

    @PutMapping("/cartdetail/{id}")
    public ResponseEntity<?> tambahStokBuku(@PathVariable("id") String  id) {
        cartDetailService.tambahStokBuku(id);
        return new ResponseEntity<>("Berhasil...", HttpStatus.OK);
    }
}
