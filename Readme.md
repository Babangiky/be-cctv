````markdown
# Backend CCTV Management System

Backend untuk sistem manajemen CCTV, dibangun menggunakan **Node.js**, **Express**, dan **MongoDB**.  
Mendukung autentikasi **JWT**, role-based access control (admin/user), dan manajemen data kamera.

## 🚀 Fitur Utama
- **Autentikasi** menggunakan JWT
- **Role-based authorization** (`admin` & `user`)
- CRUD untuk data kamera
- Middleware untuk validasi data
- Keamanan tambahan menggunakan **Helmet** & **CORS**

---

## 📦 Persiapan Sebelum Menjalankan
Pastikan sudah meng-install:
- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local atau MongoDB Atlas)

---

## 📥 Cara Menjalankan Backend

### 1️⃣ Clone Repository
```bash
git clone https://github.com/riskiananda90/backendcctv.git
cd backendcctv
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Buat file `.env` di root project, isi seperti berikut:

```env
PORT=3000
MONGO_URI=mongodb+srv://admin:Riskiananda90@cluster0.gvmvkcf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=rahasia_super_aman
```

### 4️⃣ Menjalankan Backend

Mode development:

```bash
npm run dev
```

Mode production:

```bash
npm run build
npm start
```

---

## 📡 API Endpoint Utama

### Autentikasi

| Method | Endpoint             | Deskripsi       |
| ------ | -------------------- | --------------- |
| POST   | `/api/auth/register` | Registrasi akun |
| POST   | `/api/auth/login`    | Login akun      |

### Kamera

| Method | Endpoint                  | Deskripsi                   |
| ------ | ------------------------- | --------------------------- |
| GET    | `/api/cameras`            | Ambil semua data kamera     |
| GET    | `/api/cameras/camera/:id` | Ambil kamera berdasarkan ID |
| POST   | `/api/cameras`            | Tambah kamera baru          |
| PUT    | `/api/cameras/camera/:id` | Update kamera (admin)       |
| DELETE | `/api/cameras/camera/:id` | Hapus kamera (admin)        |

> Gunakan **Header Authorization** dengan format:

```
Authorization: Bearer <token_jwt>
```

---
```markdown
## 📂 Struktur Folder
```
![alt text](image.png)
---

## 🛡 Git Ignore

Pastikan `.env` dan `node_modules` tidak di-upload ke Git:

```
.env
node_modules/
```

---

## 📝 Lisensi

MIT License © 2025 Riskiananda

```

---

Kalau mau, README ini bisa langsung aku tambahkan **contoh request API** pakai `curl` atau `REST Client VSCode` biar frontend bisa langsung nyoba integrasi.  
Mau aku tambahin sekalian?
```
