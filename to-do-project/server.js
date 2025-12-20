const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const JWT_SECRET = 'dev-secret-key';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_db',
});

// Настройка Multer для загрузки изображений
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Только изображения разрешены!'));
  },
});

// Middleware для проверки JWT токена
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Нет токена' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Неверный или просроченный токен' });
  }
}

// Функция для преобразования даты в формат MySQL DATETIME
function formatDateForMySQL(dateString) {
  if (!dateString) {
    return null;
  }
  
  // Если строка, убираем пробелы
  let str = typeof dateString === 'string' ? dateString.trim() : String(dateString).trim();
  if (str === '' || str === 'null' || str === 'undefined') {
    return null;
  }
  
  try {
    // Если уже в формате ISO с T и Z, преобразуем
    if (str.includes('T') && str.includes('Z')) {
      str = str.replace('Z', '').replace('T', ' ');
      // Убираем миллисекунды если есть
      if (str.includes('.')) {
        str = str.split('.')[0];
      }
      // Проверяем формат YYYY-MM-DD HH:MM:SS
      if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(str)) {
        return str;
      }
    }
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return null;
    }
    // Формат MySQL DATETIME: YYYY-MM-DD HH:MM:SS
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  } catch (err) {
    return null;
  }
}

// Инициализация таблиц
async function initTables() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(255),
        reminder_date DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('Таблицы инициализированы');
  } catch (err) {
    console.error('Ошибка инициализации таблиц:', err);
  }
}

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Healthcheck
app.get('/', (req, res) => res.json({ message: 'API OK' }));

// Регистрация
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Пароль должен быть минимум 6 символов' });
    }

    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Пользователь уже существует' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [
      name,
      email,
      passwordHash,
    ]);

    res.status(201).json({ message: 'Регистрация успешна' });
  } catch (err) {
    console.error('Ошибка регистрации:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Вход
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email и пароль обязательны' });
    }

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Ошибка входа:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получить все задачи пользователя
app.get('/api/tasks/user/:id', authMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (req.user.id !== userId) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    const [tasks] = await db.query(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    res.json(tasks);
  } catch (err) {
    console.error('Ошибка получения задач:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Создать задачу
app.post('/api/tasks/user/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (req.user.id !== userId) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    const { description, reminder_date } = req.body;
    if (!description) {
      return res.status(400).json({ error: 'Описание обязательно' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const reminderDate = formatDateForMySQL(reminder_date);

    const [result] = await db.query(
      'INSERT INTO tasks (user_id, description, image_url, reminder_date) VALUES (?, ?, ?, ?)',
      [userId, description, imageUrl, reminderDate]
    );

    const [task] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(task[0]);
  } catch (err) {
    console.error('Ошибка создания задачи:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Получить задачу по ID
app.get('/api/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const [tasks] = await db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);

    if (tasks.length === 0) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }

    if (tasks[0].user_id !== req.user.id) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    res.json(tasks[0]);
  } catch (err) {
    console.error('Ошибка получения задачи:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Обновить задачу
app.put('/api/tasks/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const { description, reminder_date } = req.body;

    const [tasks] = await db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    if (tasks.length === 0) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }

    if (tasks[0].user_id !== req.user.id) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    let imageUrl = tasks[0].image_url;
    if (req.file) {
      // Удаляем старое изображение если есть
      if (imageUrl) {
        const oldPath = path.join(__dirname, imageUrl);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const reminderDate = formatDateForMySQL(reminder_date);

    await db.query(
      'UPDATE tasks SET description = ?, image_url = ?, reminder_date = ? WHERE id = ?',
      [description || tasks[0].description, imageUrl, reminderDate, taskId]
    );

    const [updated] = await db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    res.json(updated[0]);
  } catch (err) {
    console.error('Ошибка обновления задачи:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Удалить задачу
app.delete('/api/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    const [tasks] = await db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    if (tasks.length === 0) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }

    if (tasks[0].user_id !== req.user.id) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    // Удаляем изображение если есть
    if (tasks[0].image_url) {
      const imagePath = path.join(__dirname, tasks[0].image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
    res.status(204).send();
  } catch (err) {
    console.error('Ошибка удаления задачи:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Запуск сервера
async function start() {
  try {
    await initTables();
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Ошибка запуска сервера:', err);
    process.exit(1);
  }
}

start();

