package com.nexsoft.buku.controller;

import com.nexsoft.buku.model.Buku;
import com.nexsoft.buku.model.Peminjaman;
import com.nexsoft.buku.model.PeminjamanDetail;
import com.nexsoft.buku.service.BukuService;
import com.nexsoft.buku.service.PeminjamanService;
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
public class PeminjamanController {
    public static final Logger logger = LoggerFactory.getLogger(PeminjamanController.class);

    @Autowired
    PeminjamanService peminjamanService;

    @Autowired
    BukuService bukuService;

    @PostMapping("/rental/")
    public ResponseEntity<?> createPeminjaman (@RequestBody Peminjaman peminjaman){
        try{
            List<PeminjamanDetail> bukuList = peminjaman.getListBuku();
            for (int i = 0; i < bukuList.size(); i++) {
                Buku buku = bukuService.checkStok(peminjaman.getListBuku().get(i).getIdBuku());

                if(buku.getStok() == 0){
                    return new ResponseEntity<>(new CustomErrorType("Peminjaman gagal! Stok Buku dengan ID " + peminjaman.getListBuku().get(i).getIdBuku() + " sudah habis."), HttpStatus.CONFLICT);
                }else if(buku.getIsActive() == 2){
                    return new ResponseEntity<>(new CustomErrorType("Peminjaman gagal! Buku dengan ID " + peminjaman.getListBuku().get(i).getIdBuku() + " sudah tidak tersedia."), HttpStatus.CONFLICT);
                }
            }
            peminjamanService.save(peminjaman);
            return new ResponseEntity<>(new CustomSuccessType("Peminjaman buku berhasil !! Buku harus dikembalikan maksimal 5 hari setelah peminjaman..."), HttpStatus.CREATED);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new CustomErrorType("Peminjaman buku gagal!!"), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/pengembalianbuku/")
    public ResponseEntity<?> createPengembalianBuku (@RequestBody Peminjaman peminjaman){
        try{
            peminjamanService.pengembalianBuku(peminjaman);
            return new ResponseEntity<>(new CustomSuccessType("Pengembalian buku berhasil..."), HttpStatus.CREATED);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new CustomErrorType("Pengembalian buku gagal!!"), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/checkpengembalian/")
    public ResponseEntity<?> pengembalian(@RequestParam String idUser) {
        logger.info("Comparing data!");
        Peminjaman peminjaman = peminjamanService.checkPengembalian(idUser);
        return new ResponseEntity<>(peminjaman, HttpStatus.OK);

    }

    @GetMapping("/pengembalian/")
    public ResponseEntity<?> pengembalianPaging(@RequestParam int page, @RequestParam int limit) {
        List<Peminjaman> pinjam = peminjamanService.dataPengembalianPaging(page, limit);
        return new ResponseEntity<>(pinjam, HttpStatus.OK);
    }

    @GetMapping("/searchpengembalian/")
    public ResponseEntity<?> searchPengembalian(@RequestParam String keyword) {
        List<Peminjaman> pinjam = peminjamanService.searchPengembalian(keyword);
        return new ResponseEntity<>(pinjam, HttpStatus.OK);
    }

    @GetMapping("/searchpengembalianpaging/")
    public ResponseEntity<?> searchPengembalianPaging(@RequestParam String keyword, @RequestParam int page, @RequestParam int limit) {
        List<Peminjaman> pinjam = peminjamanService.searchPengembalianPaging(keyword, page, limit);
        return new ResponseEntity<>(pinjam, HttpStatus.OK);
    }

    @GetMapping("/riwayatpeminjaman/")
    public ResponseEntity<?> riwayatPengembalian(@RequestParam String idUser) {
        List<Peminjaman> pinjam = peminjamanService.riwayatPeminjaman(idUser);
        return new ResponseEntity<>(pinjam, HttpStatus.OK);
    }

    @GetMapping("/total/")
    public ResponseEntity<?> totalData() {
        logger.info("Comparing data!");

        Peminjaman total = peminjamanService.totalData();
        return new ResponseEntity<>(total, HttpStatus.OK);
    }

    @GetMapping("/totallaporan/")
    public ResponseEntity<?> totalLaporan() {
        logger.info("Comparing data!");

        Peminjaman total = peminjamanService.totalDataLaporan();
        return new ResponseEntity<>(total, HttpStatus.OK);
    }

    @GetMapping("/laporan/")
    public ResponseEntity<?> laporanPaging(@RequestParam int page, @RequestParam int limit) {
        List<Peminjaman> pinjam = peminjamanService.dataLaporan(page, limit);
        return new ResponseEntity<>(pinjam, HttpStatus.OK);
    }

    @GetMapping("/filterlaporan/")
    public ResponseEntity<?> filterPaging(@RequestParam String keyword, @RequestParam String start,@RequestParam String end) {
        List<Peminjaman> pinjam = peminjamanService.filterLaporan(keyword,start, end);
        return new ResponseEntity<>(pinjam, HttpStatus.OK);
    }

    @GetMapping("/filterlaporanpaging/")
    public ResponseEntity<?> filterLaporanPaging(@RequestParam String keyword, @RequestParam String start,@RequestParam String end,@RequestParam int page, @RequestParam int limit) {
        List<Peminjaman> pinjam = peminjamanService.filterLaporanPaging(keyword,start, end, page, limit);
        return new ResponseEntity<>(pinjam, HttpStatus.OK);
    }

    @GetMapping("/cetakalllaporan/")
    public ResponseEntity<?> cetakAlllaporan() {
        List<Peminjaman> pinjam = peminjamanService.cetakAllLaporan();
        return new ResponseEntity<>(pinjam, HttpStatus.OK);
    }

}
