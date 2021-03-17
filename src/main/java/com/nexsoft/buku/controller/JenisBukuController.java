package com.nexsoft.buku.controller;

import com.nexsoft.buku.model.JenisBuku;
import com.nexsoft.buku.service.JenisBukuService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class JenisBukuController {
    public static final Logger logger = LoggerFactory.getLogger(JenisBukuController.class);

    @Autowired
    JenisBukuService jenisBukuService;

    @GetMapping("/jenisbuku/")
    public ResponseEntity<List<JenisBuku>> listAllJBuku() {
        List<JenisBuku> buku= jenisBukuService.getDataJenisBuku();

        if(buku.isEmpty()) {
            return new ResponseEntity<>(buku, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(buku, HttpStatus.OK);
    }
}
