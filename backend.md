# **API Documentation – CCTV Management System**

**Base URL (Dev)**

```
http://localhost:3000/api
```

**Base URL (Prod)**
Nanti ganti dengan domain/host server production.


## **1. Auth**

### **Register Admin**

**Endpoint**

```
POST /auth/register
```

**Headers**

```
Content-Type: application/json
```

**Body**

```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "123456"
}
```

**Response 201**

```json
{
  "message": "Admin berhasil didaftarkan",
  "admin": {
    "id": "64abc123...",
    "name": "Admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Notes**

* Hanya untuk membuat akun admin.
* Email harus unik.


### **Login Admin**

**Endpoint**

```
POST /auth/login
```

**Headers**

```
Content-Type: application/json
```

**Body**

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

**Response 200**

```json
{
  "token": "JWT_TOKEN_HERE",
  "admin": {
    "id": "64abc123...",
    "name": "Admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Notes**

* Token JWT digunakan untuk akses endpoint yang membutuhkan autentikasi.
* Simpan token di `localStorage` atau `sessionStorage`.


## **2. Camera**

### **Get All Cameras**

**Endpoint**

```
GET /cameras
```

**Headers**

```
Authorization: Bearer JWT_TOKEN
```

**Response 200**

```json
[
  {
    "id": "64abc123...",
    "name": "Kamera Depan",
    "description": "Mengawasi gerbang utama",
    "latitude": -6.2,
    "longitude": 106.816666,
    "streamUrl": "rtsp://192.168.1.10/live",
    "is_active": true,
    "created_at": "2025-08-10T10:00:00Z",
    "updated_at": "2025-08-10T10:00:00Z"
  }
]
```


### **Get Camera by ID**

**Endpoint**

```
GET /cameras/camera/:id
```

**Headers**

```
Authorization: Bearer JWT_TOKEN
```

**Response 200**

```json
{
  "id": "64abc123...",
  "name": "Kamera Depan",
  "description": "Mengawasi gerbang utama",
  "latitude": -6.2,
  "longitude": 106.816666,
  "streamUrl": "rtsp://192.168.1.10/live",
  "is_active": true,
  "created_at": "2025-08-10T10:00:00Z",
  "updated_at": "2025-08-10T10:00:00Z"
}
```


### **Create Camera** *(Admin only)*

**Endpoint**

```
POST /cameras
```

**Headers**

```
Authorization: Bearer JWT_TOKEN
Content-Type: application/json
```

**Body**

```json
{
  "name": "Kamera Depan",
  "description": "Mengawasi gerbang utama",
  "latitude": -6.200000,
  "longitude": 106.816666,
  "streamUrl": "rtsp://192.168.1.10/live"
}
```

**Response 201**

```json
{
  "id": "64abc123...",
  "name": "Kamera Depan",
  "description": "Mengawasi gerbang utama",
  "latitude": -6.2,
  "longitude": 106.816666,
  "streamUrl": "rtsp://192.168.1.10/live",
  "is_active": true,
  "created_at": "2025-08-10T10:00:00Z",
  "updated_at": "2025-08-10T10:00:00Z"
}
```


### **Update Camera** *(Admin only)*

**Endpoint**

```
PUT /cameras/camera/:id
```

**Headers**

```
Authorization: Bearer JWT_TOKEN
Content-Type: application/json
```

**Body**

```json
{
  "name": "Kamera Belakang",
  "description": "Mengawasi area belakang",
  "latitude": -6.210000,
  "longitude": 106.815000,
  "streamUrl": "rtsp://192.168.1.20/live",
  "is_active": false
}
```

**Response 200**

```json
{
  "message": "Camera updated successfully",
  "camera": { ... }
}
```


### **Delete Camera** *(Admin only)*

**Endpoint**

```
DELETE /cameras/camera/:id
```

**Headers**

```
Authorization: Bearer JWT_TOKEN
```

**Response 200**

```json
{
  "message": "Camera deleted successfully"
}
```


## **Error Responses**

* **400** → Bad Request (format data salah)
* **401** → Unauthorized (token salah/expired)
* **403** → Forbidden (role tidak sesuai)
* **404** → Data tidak ditemukan
