const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const app = express();
const port = 3002;

app.use(express.json()); // поддержка JSON

// Конфигурация для multer для загрузки изображений
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Подключение к базе данных
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user'
});

db.connect(err => {
    if (err) {
        console.error("Ошибка подключения к базе данных:", err);
    } else {
        console.log("Подключение к базе данных установлено");
    }
});


// Функция для генерации токенов
const generateToken = (userId) => {
    return jwt.sign({ id_user: userId }, 'secretKey', { expiresIn: '1h' });
};

// Регистрация пользователя
app.post('/register', upload.single('profile_image'), async (req, res) => {
    const { name_user, login_user, password_user, id_status, id_project } = req.body;
    const link_img_user = req.file ? req.file.path : null;

    try {
        const hashedPassword = await bcrypt.hash(password_user, 10);
        const query = 'INSERT INTO user (name_user, login_user, password_user, id_status, id_project, link_img_user) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [name_user, login_user, hashedPassword, id_status, id_project, link_img_user], (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(201).send("Пользователь зарегистрирован");
        });
    } catch (error) {
        res.status(500).send("Ошибка хеширования пароля");
    }
});

// Авторизация пользователя
app.post('/login', (req, res) => {
    const { login_user, password_user } = req.body;
    const query = 'SELECT * FROM user WHERE login_user = ?';
    
    db.query(query, [login_user], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send("Пользователь не найден");

        const user = results[0];
        const match = await bcrypt.compare(password_user, user.password_user);

        if (!match) {
            return res.status(400).send("Неверный пароль");
        }

        const token = generateToken(user.id_user);
        db.query('UPDATE user SET token_user = ? WHERE id_user = ?', [token, user.id_user]);
        res.json({ token });
    });
});

// Удаление пользователя
app.delete('/users/', (req, res) => {
    const { id } = req.params;
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send("Токен не предоставлен");
    }

    const query = 'DELETE FROM user WHERE id_user = ?';

    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) {
            return res.status(403).send("Недействительный токен");
        }

        const query = 'DELETE FROM user WHERE id_user = ?';
        db.query(query, [user.id_user], (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.affectedRows === 0) {
                return res.status(404).send("Пользователь не найден");
            }
            res.send("Пользователь удалён");
        });
    });
});

// Просмотр информации конкретного пользователя
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM user WHERE id_user = ?';

    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send("Пользователь не найден");
        res.json(results[0]);
    });
});

// Просмотр всех пользователей
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM user';

    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send("Пользователей не найдено");
        res.json(results);
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});