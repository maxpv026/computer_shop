import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost", // замініть на ваш хост, якщо потрібно
  user: "root",      // замініть на вашого користувача
  password: "password_123", // замініть на ваш пароль
  database: "computer_shop", // назва вашої бази даних
});

db.connect((err) => {
  if (err) {
    console.error("Помилка підключення до бази даних:", err);
    return;
  }
  console.log("Підключено до бази даних.");
});

export default db;

