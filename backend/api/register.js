import express from 'express';
import bcrypt from 'bcrypt'; // Для хешування паролів
import db from '..db.js'; // Імпорт підключення до бази даних

const router = express.Router();

// Маршрут для реєстрації користувача
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  console.log('Запит на реєстрацію:', req.body);

  // Перевірка обов'язкових полів
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL-запит для вставки даних користувача
    const query = 'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)';
    db.query(query, [username, hashedPassword, role], (err, results) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Username already exists' });
        }
        console.error('Помилка бази даних:', err);
        return res.status(500).json({ message: 'Error registering user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (err) {
    console.error('Серверна помилка при реєстрації:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

  