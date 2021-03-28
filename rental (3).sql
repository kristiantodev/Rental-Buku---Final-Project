-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 28 Mar 2021 pada 03.53
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rental`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `buku`
--

CREATE TABLE `buku` (
  `idBuku` varchar(50) NOT NULL,
  `judulBuku` varchar(100) NOT NULL,
  `pengarang` varchar(50) NOT NULL,
  `idJenisBuku` int(2) NOT NULL,
  `hargaSewa` int(7) NOT NULL,
  `stok` int(3) NOT NULL,
  `isActive` int(1) NOT NULL,
  `keterangan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `buku`
--

INSERT INTO `buku` (`idBuku`, `judulBuku`, `pengarang`, `idJenisBuku`, `hargaSewa`, `stok`, `isActive`, `keterangan`) VALUES
('B001', 'Doraemon Movie', 'Toyotaro', 1, 1500, 3, 1, '<p style=\"text-align: justify;\"><strong>Doraemon (ドラえもん Doraemon)</strong> adalah judul sebuah manga dan anime yang sangat populer yang dikarang Fujiko F. Fujio (藤子・F・不二雄) sejak 1 Juni 1969 dan berkisah tentang kehidupan seorang anak pemalas kelas 5 sekolah dasar yang bernama Nobita Nobi (野比のび太) yang didatangi oleh sebuah robot kucing bernama Doraemon yang datang dari abad ke-22. Doraemon dikirim untuk menolong Nobita agar keturunan Nobita dapat menikmati kesuksesannya daripada harus menderita dari utang finansial yang akan terjadi pada masa depan yang disebabkan karena kebodohan Nobita.</p>'),
('B002', 'The Hobbit', 'Ahmad Maulana', 2, 2000, 0, 1, '<p style=\"text-align: justify;\"><strong>Sang Hobbit</strong> (Bahasa Inggris:The Hobbit) adalah sebuah buku novel fantasi yang ditulis oleh J. R. R. Tolkien dengan alur cerita laksana dongeng. Buku ini pertama kali diterbitkan di Inggris pada 21 September 1937. Walaupun buku ini merupakan karya yang mandiri, sering kali Sang Hobbit dilihat sebagai novel fantasi pendahulu dari karya Tolkien selanjutnya: Penguasa seluruh Cincin (The Lord of the Rings), sebuah buku novel fantasi yang banyak diperbincangkan dan ketiga serinya (trilogi) dipublikasikan pada tahun 1954 hingga 1955. Novel ini lalu di terjemahkan dan diterbitkan dalam Bahasa Indonesia pada tahun 2002 oleh penerbit gramedia menyusul sambutan yang baik atas penayangan film dan penjualan buku trilogi The Lord of the Rings.</p>'),
('B003', 'Apa itu Bumi', 'Wikipedia', 3, 1000, 4, 1, '<p><strong>Bumi</strong> adalah planet ketiga dari Matahari yang merupakan planet terpadat dan terbesar kelima dari delapan planet dalam Tata Surya. Bumi juga merupakan planet terbesar dari empat planet kebumian Tata Surya. Bumi terkadang disebut dengan dunia atau Planet Biru.[23] Bumi terbentuk sekitar 4,54 miliar tahun yang lalu, dan kehidupan sudah muncul di permukaannya paling tidak sekitar 3,5 miliar tahun yang lalu.[24] Biosfer Bumi kemudian secara perlahan mengubah atmosfer dan kondisi fisik dasar lainnya, yang memungkinkan terjadinya perkembangbiakan organisme serta pembentukan lapisan ozon, yang bersama medan magnet Bumi menghalangi radiasi surya berbahaya dan mengizinkan makhluk hidup mikroskopis untuk berkembang biak dengan aman di daratan.</p>'),
('B004', 'Dilan dan Milea', 'MD Producer', 2, 1350, 4, 1, '<p style=\"text-align: justify;\"><strong>Milea </strong>(Vanesha Prescilla) bertemu dengan <strong>Dilan</strong> (Iqbaal Ramadhan) di sebuah SMA di Bandung. Itu adalah tahun 1990, saat Milea pindah dari Jakarta ke Bandung. Perkenalan yang tidak biasa kemudian membawa Milea mulai mengenal keunikan Dilan lebih jauh. Dilan yang pintar, baik hati dan romantis... semua dengan caranya sendiri. Cara Dilan mendekati Milea tidak sama dengan teman-teman lelakinya yang lain, bahkan Beni, pacar Milea di Jakarta. Bahkan cara berbicara Dilan yang terdengar kaku, lambat laun justru membuat Milea kerap merindukannya jika sehari saja ia tak mendengar suara itu. Perjalanan hubungan mereka tak selalu mulus. Beni, gank motor, tawuran, Anhar, Kang Adi, semua mewarnai perjalanan itu. Dan Dilan... dengan caranya sendiri...selalu bisa membuat Milea percaya ia bisa tiba di tujuan dengan selamat. Tujuan dari perjalanan ini. Perjalanan mereka berdua. Katanya, dunia SMA adalah dunia paling indah. Dunia Milea dan Dilan satu tingkat lebih indah daripada itu.</p>'),
('B005', 'Anatomi Tubuh', 'Paul Walker', 3, 3000, 9, 2, '<p style=\"text-align: justify;\"><span style=\"color: #2a2a2a; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, \'Noto Sans\', sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\', \'Noto Color Emoji\'; font-size: 17px; background-color: #ffffff;\"><strong>Anatomi tubuh </strong>manusia adalah ilmu yang mempelajari struktur tubuh manusia. Anatomi tubuh manusia tersusun atas sel, jaringan, organ, dan sistem organ. Sistem organ merupakan bagian yang menyusun tubuh manusia. Sistem ini terdiri atas berbagai jenis organ, yang memiliki struktur dan fungsi yang khusus. Sistem organ memiliki struktur dan fungsi yang khas. Masing-masing sistem organ saling tergantung satu sama lain, baik secara langsung maupun tidak langsung.</span></p>'),
('B006', 'Detective Conan', 'Toyotaro Masashi', 1, 1250, 0, 1, '<p>Shinichi Kudo, seorang detektif SMA berusia 17 tahun yang biasanya membantu polisi memecahkan kasus, diserang oleh 2 anggota sindikat misterius ketika mengawasi sebuah pemerasan. Ia kemudian diberi minum racun misterius yang baru selesai dikembangkan untuk membunuhnya.</p>'),
('B007', 'Laskar Pelangi', 'Andrea Hirata', 2, 1000, 0, 1, 'Novel Laskar Pelangi Singkat. Novel Laskar Pelangi mengisahkan kehidupan anak-anak di salah satu sekolah Muhammadiyah di pulau Belitong, provinsi Bangka Belitung. Awal cerita di mulai dari kegelisahan di sekolah Muhammadiyah yang terancam tertutup karena kekurangan 1 murid baru.'),
('B008', 'Naruto SD', 'Masashi Kisimoto', 1, 1750, 21, 1, '<p style=\"text-align: justify;\"><span style=\"color: #202122; font-family: sans-serif;\"><span style=\"font-size: 14px;\"><strong>Naruto (ナルト) </strong>adalah sebuah serial manga karya Masashi Kishimoto yang diadaptasi menjadi serial anime. Manga Naruto bercerita seputar kehidupan tokoh utamanya, Naruto Uzumaki, seorang ninja yang hiperaktif, periang, dan ambisius yang ingin mewujudkan keinginannya untuk mendapatkan gelar Hokage, pemimpin dan ninja terkuat di desanya. Serial ini didasarkan pada komik one-shot oleh Kishimoto yang diterbitkan dalam edisi Akamaru Jump pada Agustus 1997.</span></span></p>'),
('B009', 'Mengenal Islam', 'Muhammad', 3, 1000, 10, 1, '<p style=\"text-align: justify;\"><span style=\"color: #4d5156; font-family: arial, sans-serif; font-size: 14px; background-color: #ffffff;\"><strong>Islam</strong> adalah salah satu agama dari kelompok agama yang diterima oleh seorang nabi yang mengajarkan monoteisme tanpa kompromi, iman terhadap wahyu, iman terhadap akhir zaman, dan tanggung jawab. Bersama para pengikut Yudaisme dan Kekristenan, seluruh muslim&ndash;pengikut ajaran Islam&ndash;adalah anak turun Ibrahim.</span></p>'),
('B010', 'Dragon Ball', 'Toyotaro', 1, 2750, 10, 1, '<p style=\"text-align: justify;\"><strong>Dragon Ball (ドラゴンボール Doragon Bōru)</strong> adalah sebuah manga dan anime karya Akira Toriyama dari tahun 1984 sampai 1995. Albumnya terdiri dari 42 buku dan di Indonesia diterbitkan oleh Elex Media Komputindo. Sebelumnya Dragon Ball juga pernah diterbitkan oleh Rajawali Grafiti.</p>'),
('B011', 'Hujan', 'Tere Liye', 2, 1000, 20, 1, '<p style=\"text-align: justify;\"><strong>Hujan</strong> karya <strong>Tere Liye</strong> adalah salah satu novel romantis yang banyak digemari khususnya oleh remaja. Kisahnya ringan, dibawakan dengan bahasa yang mudah dicerna, serta memiliki kesinambungan dengan fiksi ilmiah membuatnya menarik untuk dinikmati. Novel Hujan sendiri diterbitkan pada 2016. Menceritakan tentang seorang remaja perempuan bernama Lail. Latar waktu yang diceritakan menampilkan kecanggihan teknologi yang sudah jauh berkembang, termasuk penggunaan alat komunikasi.</p>'),
('B012', 'Digimon', 'Xhing Ghuang', 1, 1500, 5, 2, '<p style=\"text-align: justify;\"><strong>Digimon (デジモン Dejimon)</strong> yang merupakan singkatan dari Digital Monster (デジタルモンスター Dejitaru Monsutā) adalah waralaba media dari Jepang untuk anak-anak yang dibuat dalam bentuk anime, manga, permainan video, permainan kartu, mainan, aksesoris barang, dan media lainnya. Diciptakan oleh tokoh misterius yang tidak pernah dikenal publik termasuk perannya dalam penciptaan Digimon yang bernama Akiyoshi Hongo.</p>');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart_detail`
--

CREATE TABLE `cart_detail` (
  `idDetail` varchar(50) NOT NULL,
  `idCart` varchar(50) NOT NULL,
  `idBuku` varchar(50) NOT NULL,
  `qty` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `cart_detail`
--

INSERT INTO `cart_detail` (`idDetail`, `idCart`, `idBuku`, `qty`) VALUES
('0e456c49-2d00-4f50-b0b0-bc17cb74ff29', 'c8867f13-be19-4867-bde3-3d00ba616d7d', 'B010', 1),
('9e592d34-43e7-4775-bbfb-bc8b7e6a7f5c', '9fa47ba6-4037-4b46-8946-b19bd9c50e9e', 'B001', 1),
('cc095248-4065-4d8b-818d-dc1e2918dea7', 'c8867f13-be19-4867-bde3-3d00ba616d7d', 'B008', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart_peminjaman`
--

CREATE TABLE `cart_peminjaman` (
  `idCart` varchar(50) NOT NULL,
  `idUser` varchar(50) NOT NULL,
  `tglPinjam` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `cart_peminjaman`
--

INSERT INTO `cart_peminjaman` (`idCart`, `idUser`, `tglPinjam`) VALUES
('9fa47ba6-4037-4b46-8946-b19bd9c50e9e', '9fa47ba6-4037-4b46-8946-b19bd9c50e9e', '2021-03-24 16:28:38'),
('c8867f13-be19-4867-bde3-3d00ba616d7d', 'c8867f13-be19-4867-bde3-3d00ba616d7d', '2021-03-23 07:05:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_peminjaman`
--

CREATE TABLE `detail_peminjaman` (
  `idDetailPinjam` varchar(60) NOT NULL,
  `idPinjam` varchar(60) NOT NULL,
  `idBuku` varchar(60) NOT NULL,
  `biayaSewa` int(7) NOT NULL,
  `qty` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `detail_peminjaman`
--

INSERT INTO `detail_peminjaman` (`idDetailPinjam`, `idPinjam`, `idBuku`, `biayaSewa`, `qty`) VALUES
('005fd298-254e-44e8-a89c-7378ad4e93dd', '00b54c49-ad95-4a4d-bc7e-68eb928d6c57', 'B005', 13500, 1),
('03cf3f49-52b4-4815-9277-c461de0bd8b2', 'f3fccd7e-e285-4504-b271-0932aaa899fe', 'B008', 1750, 1),
('09c72317-59c8-4317-b791-46b7905aecbe', 'e4e2fb18-c439-4957-9986-43555394c1b8', 'B006', 12500, 1),
('0aafe181-f5a1-4e7d-a6fa-11d3d6b35ae9', 'dc96d219-4a12-4ce4-af4f-8f2622818634', 'B001', 15000, 1),
('0ad90ec5-c8ab-4ad0-a0a2-bbe02a9f7765', 'd16b2d19-fa87-4c5e-9306-a00cc49bdd61', 'B003', 15000, 1),
('1db92585-5d48-41ac-8583-b920b020200c', '2a2eeb91-52b4-4215-b52a-608176f20783', 'B001', 15000, 1),
('22c0783c-97f7-4df5-80ec-88fce0c73925', '56fc7d2e-a137-4d87-aefd-f42e4afe51d4', 'B001', 15000, 1),
('2692d8c7-c01f-47a7-86c3-f5feabf92fc3', 'd79be792-828f-4d06-9e50-e48c19274b7f', 'B007', 1000, 1),
('26ccf0f0-cf05-430d-8f27-5afcd74972a9', '85ea08c9-2bc3-4d83-9467-1e68cb5458ef', 'B001', 15000, 1),
('2aef777e-105e-4e9e-ba51-f17fa6d00d5a', '7a29ef96-a216-4608-aa27-23e69902ae85', 'B006', 1250, 1),
('2f0940ef-7de4-4f44-8b05-b18153930107', 'cf8f22c4-2cb5-407c-8699-037d65ee0fef', 'B002', 8000, 1),
('3d95e574-01c2-433b-812a-4afd7dbdf81d', '77b8a039-567e-4b2a-b7a2-0a97bb0769bc', 'B004', 13500, 1),
('3da7c069-419c-4d89-a799-6af971104f29', 'dc96d219-4a12-4ce4-af4f-8f2622818634', 'B002', 8000, 1),
('3ebd4121-5032-43b7-9f89-5b128fd7c328', '18f28d2b-9ada-4dd0-9522-9c28625257cb', 'B003', 15000, 1),
('48250788-4443-48bf-b24f-e708d62fabfa', 'fb2ee617-6164-4e28-ae9f-853ef860d318', 'B002', 8000, 1),
('568f0122-7d5b-41fa-a17b-aeba6f4abbb3', '9e734bc4-546c-4786-9521-e2608121744a', 'B006', 12500, 1),
('56b3acd9-79ee-4682-a56e-27ea8058d5e0', '8ef9a8ee-6447-4541-91b6-1cfde8fde6df', 'B003', 15000, 1),
('59250328-32e6-4173-92d2-56d28665a3b8', '5d102387-1836-443c-aabf-1d65f5b27c03', 'B005', 13500, 1),
('5ac961b9-3332-4d4e-ad6f-7c8bf576ddc4', 'f41312bb-274b-42a0-8b53-e3a8390fcf5f', 'B011', 1000, 1),
('5d0fd835-b3b1-43cd-9b6c-a931902a12f2', '9f297b33-9bf3-48d3-86a4-9a5e7986cb30', 'B003', 15000, 1),
('5d1aa40d-6f8d-409d-acb8-a638dab7d591', '033db3f1-ac40-4ecd-b875-31d98a00695d', 'B001', 1500, 1),
('5d638ce0-9edd-4082-a8da-054b0eb8af91', '4697b18f-7d74-4aa5-9f70-3fd5d1cadd44', 'B003', 15000, 1),
('6063a4cc-8f38-4c44-80de-28b147efb757', '00b54c49-ad95-4a4d-bc7e-68eb928d6c57', 'B003', 15000, 1),
('6329269f-9c4e-4012-8ec0-c7a82b764b01', 'fa32aff8-8a50-444b-8d7b-1f2c2c358423', 'B007', 1000, 1),
('6bc1598e-02d0-4514-b696-17847151beee', '81491b7d-ce20-4d56-9897-a24ce20455fc', 'B004', 1350, 1),
('6c9d0cfd-72c4-453b-abd1-1f26f52c4fac', '01fc0aec-dcc4-4489-9121-39ed6e954bb4', 'B004', 13500, 1),
('7190ea0c-345e-4b4a-b80e-4753cb6c82ee', '4102ca93-a614-4d42-817c-ad6475fbaf0e', 'B001', 15000, 1),
('7e6f55f3-2b69-48da-8c22-e09cfa029a06', 'd79be792-828f-4d06-9e50-e48c19274b7f', 'B011', 1000, 1),
('7f8bb7db-59c7-4fdb-ab47-89566237e2f5', '85ea08c9-2bc3-4d83-9467-1e68cb5458ef', 'B002', 8000, 1),
('87fa2bc2-09c8-4ca4-bc92-4edf87e8f067', 'f3fccd7e-e285-4504-b271-0932aaa899fe', 'B004', 1350, 1),
('8d86cf75-db63-41c2-9fa4-8302079b5472', '8f628d32-17df-44ed-9f4c-8048cd91c8ec', 'B004', 1350, 1),
('8e4c1fdc-da80-4c0a-8b1b-cd7e385952a9', '77b8a039-567e-4b2a-b7a2-0a97bb0769bc', 'B006', 12500, 1),
('8fb73e32-41dc-4233-b33e-20c0c846e1c9', 'ce11e02d-7b25-4cec-97df-e3c754d7c6ae', 'B003', 15000, 1),
('94017053-b846-4188-a4e1-0b97981e30d8', 'd79be792-828f-4d06-9e50-e48c19274b7f', 'B006', 1250, 1),
('9c912b14-7228-41de-96d2-c74ebf569f53', '1f085f5c-e7ae-4a71-a241-05f586bf3058', 'B001', 15000, 1),
('a2966a2f-6644-4cdd-b308-0e510bcee5ce', '5d102387-1836-443c-aabf-1d65f5b27c03', 'B001', 15000, 1),
('a69f7b9b-0fea-406e-bc83-e7e5a9f47f56', '4d1d4025-5011-477d-a77d-bd872f068209', 'B002', 8000, 1),
('a88f8a99-ede5-40d7-8ad1-02e2ffb13a0e', '5cc53e5c-7d0c-4a6c-8f11-24ab34c57403', 'B001', 15000, 1),
('aa72a52b-1394-459d-826f-11153008e828', '81491b7d-ce20-4d56-9897-a24ce20455fc', 'B001', 1500, 1),
('aa903d74-598c-41cc-8352-fee7ee586827', '5608c3af-b18c-42bd-bcf9-0b05c1f8a90e', 'B001', 15000, 1),
('ae2dcd97-1bea-48b0-9d83-1fea73bd8d88', 'fb559889-833d-4937-913c-406c61c86e04', 'B002', 8000, 1),
('afa2654f-a053-4a1d-86b1-47bba54b22ee', '4102ca93-a614-4d42-817c-ad6475fbaf0e', 'B003', 15000, 1),
('b25646fe-cd11-4044-991f-ac024a80cc53', '8ef9a8ee-6447-4541-91b6-1cfde8fde6df', 'B005', 13500, 1),
('b6b9161e-0dd2-41cf-b9c9-f2c3fd1f8c49', '56fc7d2e-a137-4d87-aefd-f42e4afe51d4', 'B002', 8000, 1),
('bc8be50e-07e3-476b-9100-727295d9d2e4', '4102ca93-a614-4d42-817c-ad6475fbaf0e', 'B002', 8000, 1),
('bd5a245f-c5f1-405a-af7a-ef06839508be', 'f7827ee7-555c-4e40-8a3f-789a833b2875', 'B006', 12500, 1),
('c4620e34-c9f5-41b2-91ac-154443446ed0', '8e5187e7-5f18-4d01-9af8-7d6bf66dedc9', 'B004', 1350, 1),
('c583f87c-defd-4115-a0e7-efba458038d0', 'eed4a18a-1b09-4cfd-a77c-0bbaf2694364', 'B005', 13500, 1),
('c636e52b-c530-4fba-a003-1fc1d4f485c9', 'eed4a18a-1b09-4cfd-a77c-0bbaf2694364', 'B003', 15000, 1),
('ca679237-97e7-435f-9e9c-bd676f8c1473', '4b643e1b-1be5-403d-bbf5-e9219e8f43ae', 'B003', 15000, 1),
('cb77a4e9-c0f3-4fa3-ae7d-4f013c1e96c7', 'd16b2d19-fa87-4c5e-9306-a00cc49bdd61', 'B001', 15000, 1),
('cf007f84-84d8-46bf-b3d3-56f35b3a361d', 'f41312bb-274b-42a0-8b53-e3a8390fcf5f', 'B010', 2750, 1),
('cfaf6bfa-ce4a-4968-8962-7e2fdda73465', '1b0e3518-ac10-4aad-b7f9-e5eb533469e6', 'B004', 13500, 1),
('cfdd7f43-3c1b-43bd-a404-d7aa24dd7750', '19a9bc19-92ac-4b8a-8674-5fde0ada5a9e', 'B008', 7500, 1),
('d38f34bd-ada4-4a57-86eb-8d9d5225bcfe', 'f7827ee7-555c-4e40-8a3f-789a833b2875', 'B005', 13500, 1),
('d672fe8e-d702-4b12-b5fc-1ce5c7907667', 'dc96d219-4a12-4ce4-af4f-8f2622818634', 'B003', 15000, 1),
('d8ac8fd6-cd17-4047-a52e-e7f8062421bc', '5cc53e5c-7d0c-4a6c-8f11-24ab34c57403', 'B002', 8000, 1),
('db888c0f-f6fc-4c0a-a8a5-20c835137b6e', '5d102387-1836-443c-aabf-1d65f5b27c03', 'B004', 13500, 1),
('dd4e7ebf-4c76-4e87-9208-79459225309b', 'f7827ee7-555c-4e40-8a3f-789a833b2875', 'B004', 13500, 1),
('ecaf6e6e-01d1-4262-8aaf-d5a930ca607f', 'd1845422-9e6c-486e-ad86-8444901c8f44', 'B002', 8000, 1),
('eec10607-29ec-4d2e-93b0-f9b2c5d5659b', '0adcfac8-d813-4ff1-86be-4c0be9489a56', 'B004', 13500, 1),
('f31d7b31-aca7-48d4-ab7a-b33a26aa1f4c', '86262e76-972e-4275-b769-ad0d4bbf8940', 'B001', 1500, 1),
('f3586930-4643-4c85-ab26-729d3eadc679', '4697b18f-7d74-4aa5-9f70-3fd5d1cadd44', 'B001', 15000, 1),
('fe36b3e2-be79-4473-8120-13278b6752f7', '751f6f3e-7dc0-4a0c-908a-501978f9b066', 'B003', 15000, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `jenisbuku`
--

CREATE TABLE `jenisbuku` (
  `idJenisBuku` int(2) NOT NULL,
  `jenisBuku` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `jenisbuku`
--

INSERT INTO `jenisbuku` (`idJenisBuku`, `jenisBuku`) VALUES
(1, 'Komik'),
(2, 'Novel'),
(3, 'Ensiklopedia');

-- --------------------------------------------------------

--
-- Struktur dari tabel `peminjaman`
--

CREATE TABLE `peminjaman` (
  `idPinjam` varchar(60) NOT NULL,
  `idUser` varchar(50) NOT NULL,
  `tglPinjam` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `tglKembali` date DEFAULT NULL,
  `lamaPinjam` int(2) DEFAULT NULL,
  `statusPinjam` int(2) NOT NULL,
  `denda` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `peminjaman`
--

INSERT INTO `peminjaman` (`idPinjam`, `idUser`, `tglPinjam`, `tglKembali`, `lamaPinjam`, `statusPinjam`, `denda`) VALUES
('00b54c49-ad95-4a4d-bc7e-68eb928d6c57', '2', '2021-03-19 09:26:03', NULL, NULL, 1, 0),
('01fc0aec-dcc4-4489-9121-39ed6e954bb4', 'f31889e3-0129-4879-aa6e-273f7d2a8985', '2021-03-25 02:26:25', '2021-03-25', 3, 2, 0),
('033db3f1-ac40-4ecd-b875-31d98a00695d', 'd0c3aff8-44d1-447c-bfd6-51de4d995bef', '2021-03-23 03:30:04', NULL, NULL, 1, 0),
('0adcfac8-d813-4ff1-86be-4c0be9489a56', 'c8867f13-be19-4867-bde3-3d00ba616d7d', '2021-03-24 15:40:30', '2021-03-25', 1, 2, 0),
('18f28d2b-9ada-4dd0-9522-9c28625257cb', '7835b493-6198-45ab-aa0f-b6034283e7fd', '2021-03-26 15:01:23', '2021-03-26', 1, 2, 0),
('19a9bc19-92ac-4b8a-8674-5fde0ada5a9e', '9fa47ba6-4037-4b46-8946-b19bd9c50e9e', '2021-03-24 16:24:17', '2021-03-24', 1, 2, 0),
('1b0e3518-ac10-4aad-b7f9-e5eb533469e6', '9fa47ba6-4037-4b46-8946-b19bd9c50e9e', '2021-03-24 16:27:29', '2021-03-24', 1, 2, 0),
('1f085f5c-e7ae-4a71-a241-05f586bf3058', '7835b493-6198-45ab-aa0f-b6034283e7fd', '2021-03-24 04:35:59', '2021-03-24', 1, 2, 0),
('2a2eeb91-52b4-4215-b52a-608176f20783', '6677e7ae-1452-4d0f-be67-464d994d3ac5', '2021-03-22 07:15:19', '2021-03-22', 1, 2, 0),
('4102ca93-a614-4d42-817c-ad6475fbaf0e', '7835b493-6198-45ab-aa0f-b6034283e7fd', '2021-03-16 08:43:10', '2021-03-16', 1, 2, 0),
('4697b18f-7d74-4aa5-9f70-3fd5d1cadd44', '2', '2021-03-10 03:10:10', '2021-03-11', 1, 2, 0),
('4b643e1b-1be5-403d-bbf5-e9219e8f43ae', '36729d3e-b41f-436b-9ac4-71b2df994aff', '2021-03-23 14:26:14', '2021-03-23', 1, 2, 0),
('4d1d4025-5011-477d-a77d-bd872f068209', 'c8867f13-be19-4867-bde3-3d00ba616d7d', '2021-03-22 07:00:44', '2021-03-23', 1, 2, 0),
('5608c3af-b18c-42bd-bcf9-0b05c1f8a90e', '36729d3e-b41f-436b-9ac4-71b2df994aff', '2021-03-23 14:29:08', '2021-03-23', 1, 2, 0),
('56fc7d2e-a137-4d87-aefd-f42e4afe51d4', '3338102f-ff58-41ea-a020-d305936c3a09', '2021-03-10 03:10:10', '2021-03-14', 4, 2, 5000),
('5cc53e5c-7d0c-4a6c-8f11-24ab34c57403', '3338102f-ff58-41ea-a020-d305936c3a09', '2021-03-16 04:05:33', '2021-03-16', 1, 2, 0),
('5d102387-1836-443c-aabf-1d65f5b27c03', '2', '2021-03-10 03:40:54', '2021-03-12', 2, 2, 0),
('751f6f3e-7dc0-4a0c-908a-501978f9b066', '7835b493-6198-45ab-aa0f-b6034283e7fd', '2021-03-10 03:10:10', '2021-03-12', 2, 2, 0),
('77b8a039-567e-4b2a-b7a2-0a97bb0769bc', '3338102f-ff58-41ea-a020-d305936c3a09', '2021-03-17 16:26:31', '2021-03-26', 9, 2, 4000),
('7a29ef96-a216-4608-aa27-23e69902ae85', '55b0862b-dcd9-472b-9549-cb1f047d794c', '2021-03-27 13:38:33', '2021-03-27', 1, 2, 0),
('81491b7d-ce20-4d56-9897-a24ce20455fc', '121d367d-9366-4476-ad70-b45f8773e3ca', '2021-03-27 15:09:45', '2021-03-27', 1, 2, 0),
('85ea08c9-2bc3-4d83-9467-1e68cb5458ef', '3338102f-ff58-41ea-a020-d305936c3a09', '2021-03-10 03:10:10', '2021-03-15', 5, 2, 0),
('86262e76-972e-4275-b769-ad0d4bbf8940', '73bdcc37-2427-4786-8282-4f18eff6a187', '2021-03-27 03:44:16', '2021-03-27', 1, 2, 0),
('8e5187e7-5f18-4d01-9af8-7d6bf66dedc9', '73bdcc37-2427-4786-8282-4f18eff6a187', '2021-03-27 03:52:41', NULL, NULL, 1, 0),
('8ef9a8ee-6447-4541-91b6-1cfde8fde6df', '7835b493-6198-45ab-aa0f-b6034283e7fd', '2021-03-10 03:10:10', '2021-03-14', 4, 2, 0),
('8f628d32-17df-44ed-9f4c-8048cd91c8ec', '55b0862b-dcd9-472b-9549-cb1f047d794c', '2021-03-27 13:40:25', '2021-03-27', 1, 2, 0),
('9e734bc4-546c-4786-9521-e2608121744a', 'c8867f13-be19-4867-bde3-3d00ba616d7d', '2021-03-23 07:03:20', '2021-03-23', 1, 2, 0),
('9f297b33-9bf3-48d3-86a4-9a5e7986cb30', '3338102f-ff58-41ea-a020-d305936c3a09', '2021-03-10 03:10:10', '2021-03-13', 3, 2, 0),
('ce11e02d-7b25-4cec-97df-e3c754d7c6ae', '496fa544-4f15-4359-b10d-9e7ba1d97785', '2021-03-10 03:10:10', '2021-03-14', 4, 2, 0),
('cf8f22c4-2cb5-407c-8699-037d65ee0fef', '36729d3e-b41f-436b-9ac4-71b2df994aff', '2021-03-23 15:18:34', '2021-03-23', 1, 2, 0),
('d16b2d19-fa87-4c5e-9306-a00cc49bdd61', '3338102f-ff58-41ea-a020-d305936c3a09', '2021-03-10 03:10:10', '2021-03-12', 2, 2, 0),
('d1845422-9e6c-486e-ad86-8444901c8f44', 'f31889e3-0129-4879-aa6e-273f7d2a8985', '2021-03-22 07:31:23', '2021-03-22', 1, 2, 0),
('d79be792-828f-4d06-9e50-e48c19274b7f', '55b0862b-dcd9-472b-9549-cb1f047d794c', '2021-03-27 13:54:54', NULL, NULL, 1, 0),
('dc96d219-4a12-4ce4-af4f-8f2622818634', '496fa544-4f15-4359-b10d-9e7ba1d97785', '2021-03-10 03:10:10', '2021-03-15', 5, 2, 0),
('e4e2fb18-c439-4957-9986-43555394c1b8', 'c8867f13-be19-4867-bde3-3d00ba616d7d', '2021-03-23 07:04:55', '2021-03-23', 1, 2, 0),
('eed4a18a-1b09-4cfd-a77c-0bbaf2694364', '7835b493-6198-45ab-aa0f-b6034283e7fd', '2021-03-10 03:10:10', '2021-03-15', 5, 2, 0),
('f3fccd7e-e285-4504-b271-0932aaa899fe', 'e11d67b9-9656-4552-9992-6577d2dfa65b', '2021-03-20 03:25:12', '2021-03-25', 6, 2, 1000),
('f41312bb-274b-42a0-8b53-e3a8390fcf5f', '8269f7cd-2101-4339-9c34-52319ab5b779', '2021-03-22 03:50:17', NULL, 1, 1, 0),
('f7827ee7-555c-4e40-8a3f-789a833b2875', '2', '2021-03-16 02:46:02', '2021-03-16', 1, 2, 10000),
('fa32aff8-8a50-444b-8d7b-1f2c2c358423', '7835b493-6198-45ab-aa0f-b6034283e7fd', '2021-03-24 04:40:39', '2021-03-24', 1, 2, 0),
('fb2ee617-6164-4e28-ae9f-853ef860d318', '6677e7ae-1452-4d0f-be67-464d994d3ac5', '2021-03-22 04:56:26', '2021-03-22', 1, 2, 0),
('fb559889-833d-4937-913c-406c61c86e04', 'c8867f13-be19-4867-bde3-3d00ba616d7d', '2021-03-23 06:59:38', '2021-03-23', 1, 2, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `idUser` varchar(60) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL,
  `namaUser` varchar(50) NOT NULL,
  `alamat` text NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(40) NOT NULL,
  `tglRegistrasi` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`idUser`, `username`, `password`, `namaUser`, `alamat`, `phone`, `email`, `tglRegistrasi`, `role`) VALUES
('1', 'kris11', 'Kris11', 'Kristianto', 'Cirebon', '08990657546', 'kristiantorpl@gmail.com', '2021-03-28 01:51:14', 'Admin'),
('121d367d-9366-4476-ad70-b45f8773e3ca', 'Sakti10', 'Sakti10', 'Sakti Wibawa', 'Cirebon', '086473672837', 'sakti@gmail.com', '2021-03-27 15:57:01', 'Umum'),
('2', 'Malvins', 'Malvin10', 'Malvin Soleh', 'Cirebon', '08990756456', 'malvin.soleh@mail.com', '2021-03-27 03:21:31', 'Member'),
('3', 'AdminM', 'Malvin1', 'Malvin Soleh', 'Cirebon', '08990647546', 'Sincere@april.biz', '2021-03-09 02:45:15', 'Admin'),
('331c5192-9d71-42e6-9c6c-0d83e4aabf90', 'Fauzan', 'Fauzan12', 'Moch. Fauzan', 'jakarta', '0843627838476', 'fauzan@gmail.com', '2021-03-17 15:10:56', 'Member'),
('3338102f-ff58-41ea-a020-d305936c3a09', 'Habibah', 'Bibah123', 'Habibah Fitriani', 'Depok', '089906534267', 'email@gmail.com', '2021-03-17 15:11:04', 'Umum'),
('36729d3e-b41f-436b-9ac4-71b2df994aff', 'dewi10', 'Dewi10', 'Dewi Aulia', 'Cirebon', '087463778367', 'dewi@gmail.com', '2021-03-23 14:26:26', 'Member'),
('496fa544-4f15-4359-b10d-9e7ba1d97785', 'kris10', 'Kris12', 'Kristianto', 'Cirebon', '08990656354', 'email2@gmail.com', '2021-03-10 07:18:08', 'Umum'),
('55b0862b-dcd9-472b-9549-cb1f047d794c', 'haevah', 'Haevah1', 'Haevah Reza Amri', 'Cirebon', '0876453726747', 'haevah@gmail.com', '2021-03-27 13:52:15', 'Member'),
('6677e7ae-1452-4d0f-be67-464d994d3ac5', 'Alafif', 'Afif12', 'Al Afif', 'Jakarta', '089487367488', 'afif@gmail.com', '2021-03-19 07:02:21', 'Umum'),
('73bdcc37-2427-4786-8282-4f18eff6a187', 'qwerty', 'Abcd1234', 'qwerty', 'safjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkksafjdkkkkkkkkkk', '08134455555', 'kjsdkaj@sdsdd.7667', '2021-03-27 03:36:38', 'Umum'),
('7835b493-6198-45ab-aa0f-b6034283e7fd', 'SiloMDD', 'Silo123', 'Silo Mardadi', 'Bogor', '087653672837', 'silo@gmail.com', '2021-03-17 15:10:25', 'Umum'),
('7fb3eab7-7650-43c1-b270-71a8ee5b4b6a', 'Rilo123', 'Rilo123', 'Agung Rilo', 'bekasi', '08990573673', 'agung@gmail.com', '2021-03-14 09:28:25', 'Umum'),
('8269f7cd-2101-4339-9c34-52319ab5b779', 'Husen10', 'Husen10', 'Husen Nasrullah', 'tangerang', '08348264876', 'husen@gmail.com', '2021-03-25 03:45:58', 'Umum'),
('9fa47ba6-4037-4b46-8946-b19bd9c50e9e', 'Ikhlasul', 'Amal123', 'Ikhlasul Amal', 'Palembang', '08998376473', 'amal@nexsoft.co.id', '2021-03-24 16:23:05', 'Umum'),
('c8867f13-be19-4867-bde3-3d00ba616d7d', 'Alifia', 'Alif123', 'Olivia Bastari', 'Bekasi', '086453678364', 'alif@gmail.com', '2021-03-27 03:20:55', 'Umum'),
('d0c3aff8-44d1-447c-bfd6-51de4d995bef', 'Alifkun', 'Alif123', 'Alif Yudha Pratama', 'Bekasi', '087364826473', 'Sincere@aprilia.biz', '2021-03-26 03:29:35', 'Umum'),
('e11d67b9-9656-4552-9992-6577d2dfa65b', 'Eric10', 'Eric10', 'Eric Frandika', 'Palembang', '089647388463', 'eric@gmail.com', '2021-03-25 03:05:58', 'Umum'),
('f31889e3-0129-4879-aa6e-273f7d2a8985', 'Budiyono', 'Budi123', 'Budiyono nexSOFT', 'Cilacap', '087637828636', 'budi@gmail.com', '2021-03-12 02:52:41', 'Umum');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`idBuku`),
  ADD UNIQUE KEY `judulBuku` (`judulBuku`),
  ADD KEY `idJenisBuku` (`idJenisBuku`);

--
-- Indeks untuk tabel `cart_detail`
--
ALTER TABLE `cart_detail`
  ADD PRIMARY KEY (`idDetail`),
  ADD KEY `idCart` (`idCart`),
  ADD KEY `idBuku` (`idBuku`);

--
-- Indeks untuk tabel `cart_peminjaman`
--
ALTER TABLE `cart_peminjaman`
  ADD PRIMARY KEY (`idCart`),
  ADD KEY `idUser` (`idUser`);

--
-- Indeks untuk tabel `detail_peminjaman`
--
ALTER TABLE `detail_peminjaman`
  ADD PRIMARY KEY (`idDetailPinjam`),
  ADD KEY `idPinjam` (`idPinjam`),
  ADD KEY `idBuku` (`idBuku`);

--
-- Indeks untuk tabel `jenisbuku`
--
ALTER TABLE `jenisbuku`
  ADD PRIMARY KEY (`idJenisBuku`);

--
-- Indeks untuk tabel `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD PRIMARY KEY (`idPinjam`),
  ADD KEY `idUser` (`idUser`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `jenisbuku`
--
ALTER TABLE `jenisbuku`
  MODIFY `idJenisBuku` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `buku`
--
ALTER TABLE `buku`
  ADD CONSTRAINT `buku_ibfk_1` FOREIGN KEY (`idJenisBuku`) REFERENCES `jenisbuku` (`idJenisBuku`);

--
-- Ketidakleluasaan untuk tabel `cart_detail`
--
ALTER TABLE `cart_detail`
  ADD CONSTRAINT `cart_detail_ibfk_2` FOREIGN KEY (`idBuku`) REFERENCES `buku` (`idBuku`);

--
-- Ketidakleluasaan untuk tabel `cart_peminjaman`
--
ALTER TABLE `cart_peminjaman`
  ADD CONSTRAINT `cart_peminjaman_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);

--
-- Ketidakleluasaan untuk tabel `detail_peminjaman`
--
ALTER TABLE `detail_peminjaman`
  ADD CONSTRAINT `detail_peminjaman_ibfk_1` FOREIGN KEY (`idPinjam`) REFERENCES `peminjaman` (`idPinjam`),
  ADD CONSTRAINT `detail_peminjaman_ibfk_2` FOREIGN KEY (`idBuku`) REFERENCES `buku` (`idBuku`);

--
-- Ketidakleluasaan untuk tabel `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD CONSTRAINT `peminjaman_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
