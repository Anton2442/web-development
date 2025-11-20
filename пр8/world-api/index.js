const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3001;

app.use(express.json()); // для поддержки JSON

// 2. Подключение к базе данных
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'world'
});

db.connect(err => {
    if (err) {
        console.error("Ошибка подключения к базе данных:", err);
    } else {
        console.log("Подключение к базе данных установлено");
    }
});

// 3. Запросы к базе данных

// GET - получение всех городов
app.get('/cities/', (req, res) => {
    const query = 'SELECT * FROM city';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).send("Городов не найдено");
        res.json(results);
    });
});

// POST - добавление нового города
app.post('/cities/', (req, res) => {
    const { name, country_code, district, population } = req.body;
    const query = 'INSERT INTO city (name, country_code, district, population) VALUES (?, ?, ?, ?)';
    db.query(query, [name, country_code, district, population], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send("Город успешно добавлен");
    });
});

// PUT - обновление города по id
app.put('/cities/:id', (req, res) => {
    const { id } = req.params;
    const { name, country_code, district, population } = req.body;
    const query = 'UPDATE city SET name = ?, country_code = ?, district = ?, population = ? WHERE ID = ?';
    db.query(query, [name, country_code, district, population, id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).send("Город не найден");
        res.json({ id, name, country_code, district, population });
    });
});

// DELETE - удаление города по id
app.delete('/cities/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM city WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(`Город с id=${id}  удалён`);
    });
});

// Запуск сервера

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});