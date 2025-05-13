const express = require('express');
const mysql = require('mysql2');

const app = express();

// Konfigurasi koneksi ke MySQL
const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'wilayah'
};

// Buat koneksi ke database
const connection = mysql.createConnection(dbConfig);

// Tambahkan rute untuk mendapatkan data provinsi
app.get('/provinsi', (req, res) => {
    // Query untuk mendapatkan data provinsi
    const query = 'SELECT * FROM provinsi_kemendagri';

    // Lakukan query ke database
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        res.json(results);
    });
});

// Tambahkan rute untuk mendapatkan data kota berdasarkan kode provinsi
app.get('/kota/:kode_provinsi', (req, res) => {
    const { kode_provinsi } = req.params;

    // Query untuk mendapatkan data kota berdasarkan kode provinsi
    const query = `SELECT * FROM kota_kemendagri WHERE kode_provinsi = '${kode_provinsi}'`;

    // Lakukan query ke database
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        res.json(results);
    });
});

// Tambahkan rute untuk mendapatkan data kecamatan berdasarkan kode kota
app.get('/kecamatan/:kode_kota', (req, res) => {
    const { kode_kota } = req.params;

    // Query untuk mendapatkan data kota berdasarkan kode provinsi
    const query = `SELECT * FROM kecamatan_kemendagri WHERE kode_kota = '${kode_kota}'`;

    // Lakukan query ke database
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        res.json(results);
    });
});

// Tambahkan rute untuk mendapatkan data desa berdasarkan kode kecamatan
app.get('/desa/:kode_kecamatan', (req, res) => {
    const { kode_kecamatan } = req.params;

    // Query untuk mendapatkan data kota berdasarkan kode provinsi
    const query = `SELECT * FROM desa_kemendagri WHERE kode_kecamatan = '${kode_kecamatan}'`;

    // Lakukan query ke database
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        res.json(results);
    });
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan pada port ${PORT}`);
});
