package com.nexsoft.buku.controller;

import com.nexsoft.buku.model.User;
import com.nexsoft.buku.service.PenggunaService;
import com.nexsoft.buku.util.CustomErrorType;
import com.nexsoft.buku.util.CustomSuccessType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PenggunaController {
    public static final Logger logger = LoggerFactory.getLogger(PenggunaController.class);

    @Autowired
    PenggunaService penggunaService;

    @GetMapping("/login/")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        logger.info("Comparing data!");

        User pengguna = penggunaService.login(username, password);

        if(pengguna == null) {
            logger.error("Username atau password salah!");
            return new ResponseEntity<>(new CustomErrorType("Username atau password salah!"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pengguna, HttpStatus.OK);
    }

    @GetMapping("/userpaging/")
    public ResponseEntity<?> getUserPaging(@RequestParam int page, @RequestParam int limit) {
        List<User> user = penggunaService.findWithPaging(page, limit);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/userserchingpaging/")
    public ResponseEntity<?> getUserSerchingPaging(@RequestParam int page, @RequestParam int limit, @RequestParam String keyword) {
        List<User> user = penggunaService.searchWithPaging(page, limit, keyword);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/totaluserpaging/")
    public ResponseEntity<?> countUserPaging(@RequestParam String keyword){
        int count = penggunaService.totalUserPaging(keyword);
        if (count == 0){
            return new ResponseEntity<>(count, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(count,HttpStatus.OK);
    }

    @GetMapping("/user/")
    public ResponseEntity<List<User>> listAllUser() {
        List<User> userList = penggunaService.getDataUser();

        if(userList.isEmpty()) {
            return new ResponseEntity<>(userList, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @GetMapping("/profil/")
    public ResponseEntity<?> profilGet(@RequestParam String idUser) {
        logger.info("Comparing data!");

        User pengguna = penggunaService.GetProfil(idUser);

        if(pengguna == null) {
            logger.error("idUser tidak ditemukan !");
            return new ResponseEntity<>(new CustomErrorType("idUser tidak ditemukan!!"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pengguna, HttpStatus.OK);
    }

    @GetMapping("/userserching/")
    public ResponseEntity<?> userSerching(@RequestParam String keyword) {
        logger.info("Comparing data!");

        List<User> pengguna = penggunaService.serchingUser(keyword);
        return new ResponseEntity<>(pengguna, HttpStatus.OK);
    }

    @PutMapping("/updatepassword/")
    public ResponseEntity<?> updatePassword(@RequestBody User user) {

        Pattern p_pass = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{6,8}$");
        Matcher m_pass = p_pass.matcher(user.getPassword());
        User currenUser = penggunaService.GetProfil(user.getIdUser());

        if (currenUser == null) {
            logger.error("ID User tidak ditemukan !!");
            return new ResponseEntity<>(new CustomErrorType("ID User tidak ditemukan !! "),
                    HttpStatus.NOT_FOUND);
        }

        if(m_pass.matches()){
            currenUser.setPassword(user.getPassword());
            currenUser.setIdUser(user.getIdUser());
            penggunaService.updatePassword(currenUser);
            return new ResponseEntity<>(new CustomSuccessType("Password berhasil diupdate!! silahkan login kembali... "), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new CustomErrorType("Password minimal 6 karakter dan maksimal 8 karakter yang terdiri dari minimal 1 huruf besar, 1 huruf kecil, satu angka")
                    , HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/updatepassworddefault/")
    public ResponseEntity<?> updatePasswordDefault(@RequestBody User user) {

       User currenUser = penggunaService.GetProfil(user.getIdUser());

        if (currenUser == null) {
            logger.error("ID User tidak ditemukan !!");
            return new ResponseEntity<>(new CustomErrorType("ID User tidak ditemukan !! "),
                    HttpStatus.NOT_FOUND);
        }

            currenUser.setPassword(user.getPassword());
            currenUser.setIdUser(user.getIdUser());
            penggunaService.updatePassword(currenUser);
            return new ResponseEntity<>(new CustomSuccessType("Password berhasil diubah ke Default... "), HttpStatus.OK);

    }

    @PutMapping("/updatestatus/")
    public ResponseEntity<?> updateStatus(@RequestBody User user) {

        User currenUser = penggunaService.GetProfil(user.getIdUser());

        if (currenUser == null) {
            logger.error("ID User tidak ditemukan !!");
            return new ResponseEntity<>(new CustomErrorType("ID User tidak ditemukan !! "),
                    HttpStatus.NOT_FOUND);
        }
            currenUser.setRole(user.getRole());
            currenUser.setIdUser(user.getIdUser());
            penggunaService.updateStatus(currenUser);
            return new ResponseEntity<>(new CustomSuccessType("Berhasil merubah status pelanggan!! "), HttpStatus.OK);

    }

    @PutMapping("/updateprofil/")
    public ResponseEntity<?> updateProfil(@RequestBody User user) {

        User currenUser = penggunaService.GetProfil(user.getIdUser());
        Pattern p_uname = Pattern.compile("^(?=.{6,8}$)(?![.])[a-zA-Z0-9.]+(?<![_.])$");
        Matcher m_uname = p_uname.matcher(user.getUsername());

        Pattern p_email = Pattern.compile("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
        Matcher m_email = p_email.matcher(user.getEmail());

        Pattern p_phone = Pattern.compile("^(^\\+62|62|^08)(\\d{3,4}-?){2}\\d{3,4}$");
        Matcher m_phone = p_phone.matcher(user.getPhone());

        if (currenUser == null) {
            logger.error("ID User tidak ditemukan !!");
            return new ResponseEntity<>(new CustomErrorType("ID User tidak ditemukan !! "),
                    HttpStatus.NOT_FOUND);
        }

        if (m_email.matches()){
            if (m_phone.matches()){
                if (m_uname.matches()){
                        try{
                            if (penggunaService.isUsernameEditExist(user)) {
                                logger.error("Registrasi gagal !! Username sudah digunakan. Silahkan masukan username lain...", user.getUsername());
                                return new ResponseEntity<>(new CustomErrorType("Registrasi gagal !!. Username " +
                                        user.getUsername() + " sudah digunakan. Silahkan masukan username lain..."), HttpStatus.CONFLICT);
                            }else  if (penggunaService.isEmailEditExist(user)) {
                                logger.error("Registrasi gagal !! Email sudah digunakan. Silahkan masukan Email lain...", user.getEmail());
                                return new ResponseEntity<>(new CustomErrorType("Registrasi gagal !!. Email " +
                                        user.getEmail() + " sudah digunakan. Silahkan masukan Email lain..."), HttpStatus.CONFLICT);
                            }else  if (penggunaService.isPhoneEditExist(user)) {
                                logger.error("Registrasi gagal !! No.HP sudah digunakan. Silahkan masukan Np.HP lain...", user.getPhone());
                                return new ResponseEntity<>(new CustomErrorType("Registrasi gagal !!. No.HP " +
                                        user.getPhone() + " sudah digunakan. Silahkan masukan No.HP lain..."), HttpStatus.CONFLICT);
                            }else{
                                currenUser.setUsername(user.getUsername());
                                currenUser.setNamaUser(user.getNamaUser());
                                currenUser.setAlamat(user.getAlamat());
                                currenUser.setEmail(user.getEmail());
                                currenUser.setPhone(user.getPhone());
                                currenUser.setIdUser(user.getIdUser());
                                penggunaService.updateProfil(currenUser);
                                return new ResponseEntity<>(new CustomSuccessType("Profil berhasil diupdate!!"), HttpStatus.OK);

                            }
                        }catch (Exception e) {
                            e.printStackTrace();
                            return new ResponseEntity<>(new CustomErrorType("Gagal mengupdate profil"), HttpStatus.BAD_REQUEST);
                        }
                }else {
                    return new ResponseEntity<>(new CustomErrorType("Username memuat 6-8 huruf dan tidak boleh ada karakter uniq")
                            , HttpStatus.BAD_REQUEST);
                }
            }else {
                return new ResponseEntity<>(new CustomErrorType("Masukan format HP Indonesia (ex: 628113912109 atau 08134455555)")
                        , HttpStatus.BAD_REQUEST);
            }
        }else {
            return new ResponseEntity<>(new CustomErrorType("Format email salah. Contoh : (xxx.xxx@xxx.com)")
                    , HttpStatus.BAD_REQUEST);
        }

    }


    @PostMapping("/registrasi/")
    public  ResponseEntity<?> createUser (@RequestBody User user){
        if (user.getNamaUser().isBlank() || user.getUsername().isBlank()||
                user.getPassword().isBlank()|| user.getPhone().isBlank() || user.getEmail().isBlank()){
            return new ResponseEntity<>("Masukan semua data yang ada!!", HttpStatus.BAD_REQUEST);
        }
        else {
            Pattern p_uname = Pattern.compile("^(?=.{6,8}$)(?![.])[a-zA-Z0-9.]+(?<![_.])$");
            Matcher m_uname = p_uname.matcher(user.getUsername());

            Pattern p_pass = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{6,8}$");
            Matcher m_pass = p_pass.matcher(user.getPassword());

            Pattern p_email = Pattern.compile("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
            Matcher m_email = p_email.matcher(user.getEmail());

            Pattern p_phone = Pattern.compile("^(^\\+62|62|^08)(\\d{3,4}-?){2}\\d{3,4}$");
            Matcher m_phone = p_phone.matcher(user.getPhone());

            if (m_uname.matches()){
                if (m_phone.matches()){
                    if (m_email.matches()){
                        if(m_pass.matches()){
                            try{
                                if (penggunaService.isUsernameExist(user)) {
                                    logger.error("Registrasi gagal !! Username sudah digunakan. Silahkan masukan username lain...", user.getUsername());
                                    return new ResponseEntity<>(new CustomErrorType("Registrasi gagal !!. Username " +
                                            user.getUsername() + " sudah digunakan. Silahkan masukan username lain..."), HttpStatus.CONFLICT);
                                }else  if (penggunaService.isEmailExist(user)) {
                                    logger.error("Registrasi gagal !! Email sudah digunakan. Silahkan masukan Email lain...", user.getEmail());
                                    return new ResponseEntity<>(new CustomErrorType("Registrasi gagal !!. Email " +
                                            user.getEmail() + " sudah digunakan. Silahkan masukan Email lain..."), HttpStatus.CONFLICT);
                                }else  if (penggunaService.isPhoneExist(user)) {
                                    logger.error("Registrasi gagal !! No.HP sudah digunakan. Silahkan masukan Np.HP lain...", user.getPhone());
                                    return new ResponseEntity<>(new CustomErrorType("Registrasi gagal !!. No.HP " +
                                            user.getPhone() + " sudah digunakan. Silahkan masukan No.HP lain..."), HttpStatus.CONFLICT);
                                }else{
                                    penggunaService.registrasi(user);
                                    return new ResponseEntity<>(new CustomSuccessType("Registrasi berhasil !! Silahkan login..."), HttpStatus.CREATED);
                                }
                            }catch (Exception e){
                                e.printStackTrace();
                                return new ResponseEntity<>(new CustomErrorType("Failed create user"), HttpStatus.BAD_REQUEST);
                            }
                        }else{
                            return new ResponseEntity<>(new CustomErrorType("Password minimal 6 karakter dan maksimal 8 karakter yang terdiri dari minimal 1 huruf besar, 1 huruf kecil, satu angka")
                                    , HttpStatus.BAD_REQUEST);
                        }
                    }else {
                        return new ResponseEntity<>(new CustomErrorType("Format email salah. Contoh : (xxxxxx@xxx.xxx)")
                                , HttpStatus.BAD_REQUEST);
                    }
                }else {
                    return new ResponseEntity<>(new CustomErrorType("Masukan format HP Indonesia (ex: +628113912109 atau 628113912109 atau 08134455555)")
                            , HttpStatus.BAD_REQUEST);
                }
            }else {
                return new ResponseEntity<>(new CustomErrorType("Username memuat 6-8 huruf dan tidak boleh ada karakter uniq")
                        , HttpStatus.BAD_REQUEST);

            }

        }
    }


}
