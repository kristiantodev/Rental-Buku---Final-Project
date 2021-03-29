package com.nexsoft.buku.repository;

import com.nexsoft.buku.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository("PenggunaRepository")
public class PenggunaRepositoryImpl implements PenggunaRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void registrasi(User user){
        String uuid= String.valueOf(UUID.randomUUID());
        jdbcTemplate.update("INSERT INTO users(idUser, username, password, namaUser, alamat, phone, email, role) VALUES (?,?,?,?,?,?,?,?)",
                uuid,user.getUsername(), user.getPassword(), user.getNamaUser(), user.getAlamat(), user.getPhone(), user.getEmail(), user.getRole());
    }

    @Override
    public User login(String username, String password) {

        return jdbcTemplate.query("SELECT * FROM users WHERE BINARY username = ? AND BINARY password = ?",
                preparedStatement -> {
                    preparedStatement.setString(1, username);
                    preparedStatement.setString(2, password);
                },
                (rs,rowNum)->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("username"),
                                rs.getString("password"),
                                rs.getString("namaUser"),
                                rs.getString("alamat"),
                                rs.getString("phone"),
                                rs.getString("email"),
                                rs.getString("tglregistrasi"),
                                rs.getString("role")
                        )).get(0);
    }

    @Override
    public List<User> getDataUser(){
        return jdbcTemplate.query("select*from users ORDER BY role asc",
                (rs,rowNum)->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("username"),
                                rs.getString("namaUser"),
                                rs.getString("alamat"),
                                rs.getString("phone"),
                                rs.getString("email"),
                                rs.getString("tglregistrasi"),
                                rs.getString("role")
                        ));
    }

    @Override
    public List<User> serchingUser(String keyword){
        return jdbcTemplate.query("select*from users WHERE idUser LIKE ? OR username LIKE ? OR namaUser LIKE ? " +
                        "OR alamat LIKE ? OR phone LIKE ? OR email LIKE ? OR role LIKE ? ORDER BY role asc",
                preparedStatement -> {
                    preparedStatement.setString(1, "%" + keyword + "%");
                    preparedStatement.setString(2, "%" + keyword + "%");
                    preparedStatement.setString(3, "%" + keyword + "%");
                    preparedStatement.setString(4, "%" + keyword + "%");
                    preparedStatement.setString(5, "%" + keyword + "%");
                    preparedStatement.setString(6, "%" + keyword + "%");
                    preparedStatement.setString(7, "%" + keyword + "%");
                },
                (rs,rowNum)->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("username"),
                                rs.getString("namaUser"),
                                rs.getString("alamat"),
                                rs.getString("phone"),
                                rs.getString("email"),
                                rs.getString("tglregistrasi"),
                                rs.getString("role")
                        ));
    }

    @Override
    public List<User> findWithPaging(int page, int limit) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM users",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;

        int start = (page - 1) * limit;

               return jdbcTemplate.query("SELECT * FROM users  ORDER BY role asc LIMIT " + start + "," + limit + ";",
                        (rs, rowNum) ->
                                new User(
                                        rs.getString("idUser"),
                                        rs.getString("username"),
                                        rs.getString("namaUser"),
                                        rs.getString("alamat"),
                                        rs.getString("phone"),
                                        rs.getString("email"),
                                        rs.getString("tglregistrasi"),
                                        rs.getString("role")
                                ));
    }

    @Override
    public List<User> searchWithPaging(int page, int limit, String keyword) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM users",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;

        int start = (page - 1) * limit;

        return jdbcTemplate.query("select*from users WHERE idUser LIKE ? OR username LIKE ? OR namaUser LIKE ? " +
                        "OR alamat LIKE ? OR phone LIKE ? OR email LIKE ? OR role LIKE ? ORDER BY role asc LIMIT " + start + "," + limit +";",
                preparedStatement -> {
                    preparedStatement.setString(1, "%" + keyword + "%");
                    preparedStatement.setString(2, "%" + keyword + "%");
                    preparedStatement.setString(3, "%" + keyword + "%");
                    preparedStatement.setString(4, "%" + keyword + "%");
                    preparedStatement.setString(5, "%" + keyword + "%");
                    preparedStatement.setString(6, "%" + keyword + "%");
                    preparedStatement.setString(7, "%" + keyword + "%");
                },
                (rs,rowNum)->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("username"),
                                rs.getString("namaUser"),
                                rs.getString("alamat"),
                                rs.getString("phone"),
                                rs.getString("email"),
                                rs.getString("tglregistrasi"),
                                rs.getString("role")
                        ));
    }

    @Override
    public int totalUserPaging(String keyword){
        int count;
        count = jdbcTemplate.queryForObject("select count(*) as count from users WHERE idUser LIKE '%"+keyword+"%' OR username LIKE '%"+keyword+"%' OR namaUser LIKE '%"+keyword+"%' " +
                        "OR alamat LIKE '%"+keyword+"%' OR phone LIKE '%"+keyword+"%' OR email LIKE '%"+keyword+"%' OR role LIKE '%"+keyword+"%'"
                ,Integer.class);
        return count;
    }

    @Override
    public User GetProfil(String idUser) {

        return jdbcTemplate.query("SELECT * FROM users WHERE idUser = ?",
                preparedStatement -> {
                    preparedStatement.setString(1, idUser);
                },
                (rs,rowNum)->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("username"),
                                rs.getString("namaUser"),
                                rs.getString("alamat"),
                                rs.getString("phone"),
                                rs.getString("email"),
                                rs.getString("tglregistrasi"),
                                rs.getString("role")
                        )).get(0);
    }

    @Override
    public void updatePassword(User user){
        jdbcTemplate.update("UPDATE users SET password = '"+user.getPassword()+"' WHERE idUser = '"+user.getIdUser()+"'");
    }

    @Override
    public void updateStatus(User user){
        jdbcTemplate.update("UPDATE users SET role = '"+user.getRole()+"' WHERE idUser = '"+user.getIdUser()+"'");
    }

    @Override
    public void updateProfil(User user){
        jdbcTemplate.update(
                "UPDATE users SET username = ?, namaUser = ?, alamat = ?, email = ?, phone = ? WHERE idUser = ?",
                user.getUsername(), user.getNamaUser(), user.getAlamat(), user.getEmail(), user.getPhone(), user.getIdUser()
        );
    }

    @Override
    public User findById(String idUser) {

        return jdbcTemplate.query("SELECT * FROM users WHERE idUser = ?",
                preparedStatement -> {
                    preparedStatement.setString(1, idUser);
                },
                (rs,rowNum)->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("username"),
                                rs.getString("namaUser"),
                                rs.getString("alamat"),
                                rs.getString("phone"),
                                rs.getString("email"),
                                rs.getString("tglregistrasi"),
                                rs.getString("role")
                        )).get(0);
    }

    @Override
    public User findByUsername(String username) {

        return jdbcTemplate.query("SELECT * FROM users WHERE username = ?",
                preparedStatement -> {
                    preparedStatement.setString(1, username);
                },
                (rs,rowNum)->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("username"),
                                rs.getString("namaUser"),
                                rs.getString("alamat"),
                                rs.getString("phone"),
                                rs.getString("email"),
                                rs.getString("tglregistrasi"),
                                rs.getString("role")
                        )).get(0);
    }

    @Override
    public User findByEmail(String email) {

        return jdbcTemplate.query("SELECT * FROM users WHERE email = ?",
                preparedStatement -> {
                    preparedStatement.setString(1, email);
                },
                (rs,rowNum)->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("username"),
                                rs.getString("namaUser"),
                                rs.getString("alamat"),
                                rs.getString("phone"),
                                rs.getString("email"),
                                rs.getString("tglregistrasi"),
                                rs.getString("role")
                        )).get(0);
    }

    @Override
    public User findByPhone(String phone) {

        return jdbcTemplate.query("SELECT * FROM users WHERE phone = ?",
                preparedStatement -> {
                    preparedStatement.setString(1, phone);
                },
                (rs,rowNum)->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("username"),
                                rs.getString("namaUser"),
                                rs.getString("alamat"),
                                rs.getString("phone"),
                                rs.getString("email"),
                                rs.getString("tglregistrasi"),
                                rs.getString("role")
                        )).get(0);
    }

    @Override
    public User findByUsernameEdit(String username, String idUser) {

        return jdbcTemplate.query("SELECT * FROM users WHERE username = ? AND idUser <> ?",
                preparedStatement -> {
                    preparedStatement.setString(1, username);
                    preparedStatement.setString(2, idUser);
                },
                (rs,rowNum)->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("username"),
                                rs.getString("namaUser"),
                                rs.getString("alamat"),
                                rs.getString("phone"),
                                rs.getString("email"),
                                rs.getString("tglregistrasi"),
                                rs.getString("role")
                        )).get(0);
    }

    @Override
    public User findByEmailEdit(String email, String idUser) {

        return jdbcTemplate.query("SELECT * FROM users WHERE email = ? AND idUser <> ?",
                preparedStatement -> {
                    preparedStatement.setString(1, email);
                    preparedStatement.setString(2, idUser);
                },
                (rs,rowNum)->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("username"),
                                rs.getString("namaUser"),
                                rs.getString("alamat"),
                                rs.getString("phone"),
                                rs.getString("email"),
                                rs.getString("tglregistrasi"),
                                rs.getString("role")
                        )).get(0);
    }

    @Override
    public User findByPhoneEdit(String phone, String idUser) {

        return jdbcTemplate.query("SELECT * FROM users WHERE phone = ? AND idUser <> ?",
                preparedStatement -> {
                    preparedStatement.setString(1, phone);
                    preparedStatement.setString(2, idUser);
                },
                (rs,rowNum)->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("username"),
                                rs.getString("namaUser"),
                                rs.getString("alamat"),
                                rs.getString("phone"),
                                rs.getString("email"),
                                rs.getString("tglregistrasi"),
                                rs.getString("role")
                        )).get(0);
    }

}
