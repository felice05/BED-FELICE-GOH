const express = require('express');
const sql = require('mssql');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the Book Category API');
});
app.get('/db-test', async (req, res) => {
try {
const pool = await sql.connect({
server: 'localhost',
port: 1433,
database: 'NPBookstore',
user: 'npbookstore user',
password: 'Felicee@2008',
options: { trustServerCertificate: true },
});
const result = await pool.request()
.query('SELECT COUNT(*) AS Total FROM Author');
await pool.close();
res.json({ connected: true, authors: result.recordset[0].Total });
} catch (err) {
res.status(500).json({ connected: false, error: err.message });
}
});
app.listen(3000, () => {
    console.log('Listening on port 3000');
});