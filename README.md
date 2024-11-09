
# Taxi App

Taxi App adalah aplikasi berbasis Vite, React, dan TypeScript yang dirancang untuk memberikan pengalaman pengguna yang optimal pada perangkat ponsel pintar.

## Prasyarat

Pastikan Anda memiliki prasyarat berikut sebelum memulai:

- Node.js (versi 14 atau lebih baru)
- NPM (versi 6 atau lebih baru) atau Yarn

## Instalasi

1. **Clone repository**:

    ```bash
    git clone "https://github.com/SyukurIman/tes_app.git"
    cd taxi-app
    ```

2. **Instalasi dependencies**:

    Menggunakan NPM:

    ```bash
    npm install
    ```

    Menggunakan Yarn:

    ```bash
    yarn install
    ```

## Menjalankan Aplikasi

Untuk menjalankan aplikasi di mode pengembangan:

```bash
npm run dev
```

atau

```bash
yarn dev
```

Aplikasi akan berjalan pada `http://localhost:5173` secara default.

## Konfigurasi Lingkungan (Environment)

Buat file `.env` di direktori root proyek Anda dan tambahkan konfigurasi berikut:

```
VITE_SERVER_URL=http://localhost:3000
```

**Catatan**: Anda dapat mengganti `VITE_SERVER_URL` dengan URL server yang sesuai untuk lingkungan pengembangan Anda.

## Struktur Proyek

Berikut adalah struktur direktori utama proyek ini:

```
.
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets
│   ├── components
│   ├── pages
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## Penyesuaian Tampilan Ponsel

Aplikasi ini dirancang untuk berfokus pada perangkat ponsel pintar. Beberapa langkah yang diambil meliputi:

- Desain responsif menggunakan CSS atau framework CSS seperti TailwindCSS.
- Viewport meta tag sudah diatur di `index.html` untuk memastikan render pada perangkat ponsel.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

## Build untuk Produksi

Untuk membuat build siap produksi:

```bash
npm run build
```

atau

```bash
yarn build
```

Output akan tersedia di folder `dist`.

## Jalankan Build

Untuk menjalankan build yang sudah dihasilkan:

```bash
npm run preview
```

atau

```bash
yarn preview
```

## Instalasi Backend (Next.js + TypeScript)

Pada bagian backend menggunakan Next.js dengan TypeScript dan diintegrasikan dengan Prisma untuk pengelolaan database. Berikut langkah-langkah untuk memulai backend:

### Prasyarat

- Node.js (versi 14 atau lebih baru)
- NPM (versi 6 atau lebih baru) atau Yarn
- PostgreSQL (untuk koneksi database)

### Instalasi

1. **Clone repository backend**:

    ```bash
    git clone "https://github.com/SyukurIman/tes_app.git"
    cd taxi-be
    ```

2. **Instalasi dependencies**:

    Menggunakan NPM:

    ```bash
    npm install
    ```

    Menggunakan Yarn:

    ```bash
    yarn install
    ```

3. **Konfigurasi Lingkungan (Environment)**

   Buat file `.env` di direktori root proyek backend Anda dan tambahkan konfigurasi berikut:

    ```
    # Environment variables declared in this file are automatically made available to Prisma.
    # See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

    # Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
    # See the documentation for all the connection string options: https://pris.ly/d/connection-strings

    DATABASE_URL="postgresql://user:password@localhost:5432/name_db?schema=public"

    JWT_SECRET=
    JWT_ALGO=HS256
    JWT_SHOW_BLACKLIST_EXCEPTION=true

    OPENROUTESERVICE_API_KEY=
    IPINFO_API_KEY=

    MAX_AGE="86400" # 60 * 60 * 24 = 24 hours
    CREDENTIALS="true"
    DOMAIN_URL=""

    ALLOWED_METHODS="GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS"
    ALLOWED_ORIGIN="http://localhost:5173,http://localhost:3000" # * for all
    ALLOWED_HEADERS="Content-Type, Authorization"
    EXPOSED_HEADERS=""
    ```

   **Catatan**:
   - Gantilah `DATABASE_URL` sesuai dengan konfigurasi database lokal Anda.
   - `JWT_SECRET` digunakan untuk menandatangani dan memverifikasi token JWT.
   - API keys (`OPENROUTESERVICE_API_KEY`, `IPINFO_API_KEY`) dapat diperoleh dari masing-masing layanan terkait.

4. **Menjalankan Aplikasi**

    Jalankan aplikasi backend dalam mode pengembangan:

    ```bash
    npm run dev
    ```

    atau

    ```bash
    yarn dev
    ```

5. **Migrasi Database**

    Untuk membuat migrasi database menggunakan Prisma, jalankan perintah berikut:

    ```bash
    npx prisma migrate dev --name init
    ```

## Build untuk Produksi

Untuk membuat build siap produksi:

```bash
npm run build
```

atau

```bash
yarn build
```

Output akan tersedia di folder `.next`.

## Menjalankan Build

Untuk menjalankan aplikasi yang telah dibuild:

```bash
npm start
```

atau

```bash
yarn start
```

## Lisensi

[Lisensi MIT](LICENSE) © 2024 SyukurImanAttaqwa
