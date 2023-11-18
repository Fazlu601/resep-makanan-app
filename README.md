# Resep Makanan App with React JS
>Silahkan klik tombol dibawah ini untuk mengunjungi sisi Back-End <br> 👇👇👇

[![BackEnd](https://img.shields.io/badge/BackEnd-Kunjungi-f9322c?style=for-the-badge&logo=laravel&logoColor=white)](https://github.com/Fazlu601/resep-makanan-app)
## **Fitur**
- Autentikasi & Otorisasi
- Create Resep Makanan (Include: Nama Bahan, Langkah penyajian)
- Lihat Detail Bahan Makanan
- Like Postingan Resep 1x per-account

## **Struktur Folder**
```
resep-makanan-app/
|-- public/
|   |-- logo.png
|-- src/
|   |-- api/
|   |   |-- api.js
|   |-- assets/
|   |-- components/
|   |   |-- card/
|   |   |   |-- CardRecipe.jsx
|   |   |-- content/
|   |   |   |-- ResepWrapper.jsx
|   |   |-- footer/
|   |   |   |-- Footer.jsx
|   |   |-- header/
|   |   |   |-- NavBar.jsx
|   |   |-- input/
|   |   |   |-- InputComponent.jsx
|   |   |-- loader/
|   |   |   |-- Loading.jsx
|   |-- context/
|   |   |-- AuthProvider.jsx
|   |-- pages/
|   |   |-- auth/
|   |   |   |-- Login.jsx
|   |   |   |-- Register.jsx
|   |   |-- CreateRecipe.jsx
|   |   |-- Home.jsx
|   |   |-- ShowRecipe.jsx
|   |-- App.jsx
|   |-- main.jsx
|-- .gitignore
|-- index.html
|-- package.json
|-- README.md
```

## **Cara Instalasi & Pemakaian**
1. Clone Repository dari terminal command prompt atau bash
```
git clone https://github.com/Fazlu601/resep-makanan-service.git
```

2. Masuk ke Directory resep-makanan-app, lalu install Dependency Package terlebih dahulu
```
cd resep-makanan-app
npm install
```

3. Setelah semua Dependency terinstall, jalankan server dengan menggunakan perintah
```
cd resep-makanan-app
npm install
```

3. Jika berhasil menjalankan perintah ``npm run dev``, maka seharusnya akan muncul url dari aplikasi react kita, copy dan paste url tersebut di browser

4. Sebelum menjalankan fitur, harap server apinya dinyalakan terlebih dahulu melalui local

