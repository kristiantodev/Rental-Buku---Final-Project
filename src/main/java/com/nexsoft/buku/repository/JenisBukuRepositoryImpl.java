package com.nexsoft.buku.repository;

import com.nexsoft.buku.model.JenisBuku;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("JenisBukuRepository")
public class JenisBukuRepositoryImpl implements JenisBukuRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<JenisBuku> getDataJenisBuku(){
        return jdbcTemplate.query("select*from jenisbuku"
                ,
                (rs,rowNum)->
                        new JenisBuku(
                                rs.getInt("idJenisBuku"),
                                rs.getString("jenisBuku")
                        ));
    }

}
