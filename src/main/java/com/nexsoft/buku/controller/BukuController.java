package com.nexsoft.buku.controller;

import com.nexsoft.buku.model.Buku;
import com.nexsoft.buku.model.JenisBuku;
import com.nexsoft.buku.service.BukuService;
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
public class BukuController {
    public static final Logger logger = LoggerFactory.getLogger(BukuController.class);

    @Autowired
    BukuService bukuService;

    @GetMapping("/buku/")
    public ResponseEntity<List<Buku>> listAllBuku() {
        List<Buku> bukuList = bukuService.getDataBuku();

        if(bukuList.isEmpty()) {
            return new ResponseEntity<>(bukuList, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(bukuList, HttpStatus.OK);
    }

    @GetMapping("/jenisbuku/")
    public ResponseEntity<List<JenisBuku>> listAllJBuku() {
        List<JenisBuku> buku= bukuService.getDataJenisBuku();

        if(buku.isEmpty()) {
            return new ResponseEntity<>(buku, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(buku, HttpStatus.OK);
    }

    @GetMapping("/bukupaging/")
    public ResponseEntity<?> getBukuPaging(@RequestParam int page, @RequestParam int limit) {
        List<Buku> buku = bukuService.findWithPaging(page, limit);
        return new ResponseEntity<>(buku, HttpStatus.OK);
    }

    @GetMapping("/bukuserching/")
    public ResponseEntity<?> bukuSerching(@RequestParam String keyword) {
        logger.info("Comparing data!");

        List<Buku> buku = bukuService.serchingBuku(keyword);
        return new ResponseEntity<>(buku, HttpStatus.OK);
    }

    @GetMapping("/bukuserchingpaging/")
    public ResponseEntity<?> getBukuSerchingPaging(@RequestParam int page, @RequestParam int limit, @RequestParam String keyword) {
        List<Buku> buku = bukuService.searchWithPaging(page, limit, keyword);
        return new ResponseEntity<>(buku, HttpStatus.OK);
    }

    @DeleteMapping("/buku/{id}")
    public ResponseEntity<?> deleteBuku(@PathVariable("id") String  id) {
        logger.info("Fetching & deleting Buku with id {}", id);

        bukuService.deleteById(id);
        return new ResponseEntity<>(new CustomSuccessType("Buku dengan ID " + id + " berhasil dihapus!!"), HttpStatus.OK);
    }

    @PostMapping("/buku/")
    public  ResponseEntity<?> createBuku (@RequestBody Buku buku){
        try{
            if (bukuService.isIdBukuExist(buku)) {
                logger.error("ID Buku sudah digunakan. Silahkan masukan ID Buku lain...");
                return new ResponseEntity<>(new CustomErrorType("ID Buku " +
                        buku.getIdBuku() + " sudah digunakan. Silahkan masukan ID lain..."), HttpStatus.CONFLICT);
            }else  if (bukuService.isJudulBukuExist(buku)) {
                logger.error("Registrasi gagal !! Email sudah digunakan. Silahkan masukan Email lain...");
                return new ResponseEntity<>(new CustomErrorType("Judul Buku " +
                        buku.getJudulBuku() + " sudah digunakan. Silahkan masukan Judul lain..."), HttpStatus.CONFLICT);
            }else{
                bukuService.addBuku(buku);
                return new ResponseEntity<>(new CustomSuccessType("Buku baru berhasil ditambah !!"), HttpStatus.CREATED);
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new CustomErrorType("Gagal menambahkan buku baru"), HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/buku/")
    public ResponseEntity<?> updateBuku(@RequestBody Buku buku) {

        if (bukuService.isJudulBukuEditExist(buku)) {
            logger.error("Gagal!! Silahkan masukan judul lain...");
            return new ResponseEntity<>(new CustomErrorType("Update gagal !!. Judul Buku " +
                    buku.getJudulBuku() + " sudah digunakan. Silahkan masukan judul lain..."), HttpStatus.CONFLICT);
        }else{
            if(buku.getStok() < 0){
                return new ResponseEntity<>(new CustomErrorType("Stok pengurangan dilarang melebihi stok asli!!"), HttpStatus.CONFLICT);
            }
            bukuService.updateBuku(buku);
            return new ResponseEntity<>(new CustomSuccessType("Update buku dengan ID "+buku.getIdBuku()+" berhasil !! "), HttpStatus.OK);
        }
    }

    @PutMapping("/updatestatusbuku/")
    public ResponseEntity<?> updateStatusBuku(@RequestBody Buku buku) {

        bukuService.updateStatus(buku);
        return new ResponseEntity<>(new CustomSuccessType("Berhasil merubah status Buku!! "), HttpStatus.OK);

    }


}
