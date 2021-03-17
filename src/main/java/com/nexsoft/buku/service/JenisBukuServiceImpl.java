package com.nexsoft.buku.service;

import com.nexsoft.buku.model.JenisBuku;
import com.nexsoft.buku.repository.BukuRepository;
import com.nexsoft.buku.repository.JenisBukuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("jenisBukuService")
public class JenisBukuServiceImpl implements  JenisBukuService{
    @Autowired
    JenisBukuRepository jenisBukuRepository;

    public List<JenisBuku> getDataJenisBuku() {
        List<JenisBuku> pd;

        try{
            pd = jenisBukuRepository.getDataJenisBuku();
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }

        return pd;

    }
}
