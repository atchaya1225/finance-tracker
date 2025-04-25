const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./finance.db');

// ✅ Create the transactions table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL, 
        amount REAL NOT NULL, 
        category TEXT NOT NULL, 
        date TEXT NOT NULL
    )`);
});

// ✅ Get all transactions
app.get('/transactions', (req, res) => {
    db.all('SELECT * FROM transactions', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// ✅ Add a new transaction
app.post('/transactions', (req, res) => {
    const { type, amount, category, date } = req.body;
    db.run('INSERT INTO transactions (type, amount, category, date) VALUES (?, ?, ?, ?)', 
        [type, amount, category, date], 
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, message: 'Transaction added successfully!' });
        }
    );
});

// ✅ Update an existing transaction
app.put('/transactions/:id', (req, res) => {
    const { type, amount, category, date } = req.body;
    db.run('UPDATE transactions SET type=?, amount=?, category=?, date=? WHERE id=?',
        [type, amount, category, date, req.params.id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ updated: true, message: 'Transaction updated successfully!' });
        }
    );
});

// ✅ Delete a transaction
app.delete('/transactions/:id', (req, res) => {
    db.run('DELETE FROM transactions WHERE id=?', req.params.id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ deleted: true, message: 'Transaction deleted successfully!' });
    });
});

// ✅ Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
