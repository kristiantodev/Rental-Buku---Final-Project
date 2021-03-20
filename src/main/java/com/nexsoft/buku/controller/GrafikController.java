package com.nexsoft.buku.controller;

import com.nexsoft.buku.model.Grafik;
import com.nexsoft.buku.service.GrafikService;
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
public class GrafikController {
    public static final Logger logger = LoggerFactory.getLogger(GrafikController.class);
    @Autowired
    GrafikService grafikService;

    @GetMapping("/pelangganteraktif/")
    public ResponseEntity<List<Grafik>> listPelangganAktif() {
        List<Grafik> grafik = grafikService.pelangganTeraktif();

        if(grafik.isEmpty()) {
            return new ResponseEntity<>(grafik, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/pelangganteraktiffilter/")
    public ResponseEntity<List<Grafik>> listPelangganAktifFilter(@RequestParam int bulan, @RequestParam int tahun) {
        List<Grafik> grafik = grafikService.pelangganTeraktifFilter(bulan, tahun);

        if(grafik.isEmpty()) {
            return new ResponseEntity<>(grafik, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/bukupopuler/")
    public ResponseEntity<List<Grafik>> listBukuPopuler() {
        List<Grafik> grafik = grafikService.bukuPopuler();

        if(grafik.isEmpty()) {
            return new ResponseEntity<>(grafik, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/bukupopulerfilter/")
    public ResponseEntity<List<Grafik>> listBukuPopulerFilter(@RequestParam int bulan, @RequestParam int tahun) {
        List<Grafik> grafik = grafikService.bukuPopulerFilter(bulan, tahun);

        if(grafik.isEmpty()) {
            return new ResponseEntity<>(grafik, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/pendapatanbulanini/")
    public ResponseEntity<List<Grafik>> pendapatanBulanIni() {
        List<Grafik> grafik = grafikService.allPendapatan();

        if(grafik.isEmpty()) {
            return new ResponseEntity<>(grafik, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/allpendapatanfilter/")
    public ResponseEntity<List<Grafik>> allPendapatanFilter(@RequestParam int bulan, @RequestParam int tahun) {
        List<Grafik> grafik = grafikService.allPendapatanFilter(bulan, tahun);

        if(grafik.isEmpty()) {
            return new ResponseEntity<>(grafik, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/pengeluaranpelanggan/")
    public ResponseEntity<List<Grafik>> listPengeluaranPelanggan(@RequestParam String idUser) {
        List<Grafik> grafik = grafikService.pengeluaranPelanggan(idUser);

        if(grafik.isEmpty()) {
            return new ResponseEntity<>(grafik, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/pengeluaranpelangganfilter/")
    public ResponseEntity<List<Grafik>> listPengeluaranPelangganFilter(@RequestParam String idUser, @RequestParam int bulan, @RequestParam int tahun) {
        List<Grafik> grafik = grafikService.pengeluaranPelangganFilter(idUser, bulan, tahun);

        if(grafik.isEmpty()) {
            return new ResponseEntity<>(grafik, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/totalbukupinjam/")
    public ResponseEntity<Grafik> totalBukuPinjam(@RequestParam String idUser) {
        Grafik grafik = grafikService.totalBukuPinjam(idUser);
        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/totalbukubelumdikembalikan/")
    public ResponseEntity<Grafik> totalBukuBelumDikembalikan(@RequestParam String idUser) {
        Grafik grafik = grafikService.totalBukuBelumDikembalikan(idUser);
        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/totalpengeluaran/")
    public ResponseEntity<Grafik> totalPengeluaran(@RequestParam String idUser) {
        Grafik grafik = grafikService.totalPengeluaran(idUser);
        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/totalpengeluaranfilter/")
    public ResponseEntity<Grafik> totalPengeluaranFilter(@RequestParam String idUser, @RequestParam int bulan, @RequestParam int tahun) {
        Grafik grafik = grafikService.totalPengeluaranFilter(idUser, bulan, tahun);
        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/bukuterpinjam/")
    public ResponseEntity<Grafik> bukuTerpinjam() {
        Grafik grafik = grafikService.bukuTerpinjam();
        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/totalpendapatanrental/")
    public ResponseEntity<Grafik> totalPendapatanRental() {
        Grafik grafik = grafikService.totalPendapatanRental();
        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/totalpendapatanrentalfilter/")
    public ResponseEntity<Grafik> totalPendapatanRentalFilter(@RequestParam int bulan, @RequestParam int tahun) {
        Grafik grafik = grafikService.totalPendapatanRentalFilter(bulan, tahun);
        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }
    @GetMapping("/totalpinjamkomik/")
    public ResponseEntity<Grafik> totalPinjamKomik(@RequestParam String idUser) {
        Grafik grafik = grafikService.totalPinjamKomik(idUser);
        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/totalpinjamnovel/")
    public ResponseEntity<Grafik> totalPinjamNovel(@RequestParam String idUser) {
        Grafik grafik = grafikService.totalPinjamNovel(idUser);
        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

    @GetMapping("/totalpinjamensiklopedia/")
    public ResponseEntity<Grafik> totalPinjamEnsiklopedia(@RequestParam String idUser) {
        Grafik grafik = grafikService.totalPinjamEnsiklopedia(idUser);
        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }

}
