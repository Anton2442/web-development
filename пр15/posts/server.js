const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const axios = require('axios');
require('dotenv').config();

const PORT = 3001;
const JWT_SECRET = 'dev-secret';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Pr15',
});

async function ensureTables() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Нет токена' });

  const [, token] = authHeader.split(' ');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Неверный или просроченный токен' });
  }
}

const app = express();
app.use(cors());
app.use(express.json());

// Healthcheck
app.get('/', (_req, res) => res.send('API OK'));

// Регистрация
app.post(
  '/register',
  [
    body('email').isEmail().withMessage('Некорректная почта'),
    body('password').isLength({ min: 6 }).withMessage('Минимум 6 символов'),
    body('firstName').notEmpty().withMessage('Введите имя'),
    body('lastName').notEmpty().withMessage('Введите фамилию'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName } = req.body;

    try {
      const [existing] = await db.query('SELECT id FROM users WHERE email=?', [email]);
      if (existing.length) {
        return res.status(409).json({ error: 'Пользователь уже существует' });
      }

      const hash = await bcrypt.hash(password, 10);
      await db.query(
        'INSERT INTO users (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)',
        [email, hash, firstName, lastName]
      );

      res.status(201).json({ message: 'Регистрация успешна' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Логин
app.post(
  '/login',
  [
    body('email').isEmail().withMessage('Некорректная почта'),
    body('password').notEmpty().withMessage('Введите пароль'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const [rows] = await db.query('SELECT * FROM users WHERE email=?', [email]);
      if (!rows.length) return res.status(401).json({ error: 'Неверный логин или пароль' });

      const user = rows[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return res.status(401).json({ error: 'Неверный логин или пароль' });

      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.first_name },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Защищенный маршрут постов
app.get('/posts', authMiddleware, async (_req, res) => {
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=6');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Не удалось получить посты' });
  }
});

async function start() {
  try {
    await ensureTables();
    app.listen(PORT, () => console.log(`API http://localhost:${PORT}`));
  } catch (err) {
    console.error('Ошибка старта сервера', err);
    process.exit(1);
  }
}

start();

