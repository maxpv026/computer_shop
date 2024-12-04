import express from "express";
import db from "../db.js";
import authenticate from "../middleware/authenticate.js"; // Middleware для перевірки токена

const router = express.Router();

// Отримання всіх продуктів
router.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Помилка отримання продуктів:", err);
      return res.status(500).send("Помилка отримання продуктів");
    }
    res.status(200).json(results);
  });
});

// Отримання продуктів за категорією
router.get("/products/category/:category_id", (req, res) => {
  const { category_id } = req.params;
  const query = "SELECT * FROM products WHERE category_id = ?";
  db.query(query, [category_id], (err, results) => {
    if (err) {
      console.error("Помилка отримання продуктів за категорією:", err);
      return res.status(500).send("Помилка отримання продуктів за категорією");
    }
    res.status(200).json(results);
  });
});

// Отримання одного продукту за ID
router.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM products WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Помилка отримання продукту:", err);
      return res.status(500).send("Помилка отримання продукту");
    }
    if (results.length === 0) {
      return res.status(404).send("Продукт не знайдено");
    }
    res.status(200).json(results[0]);
  });
});

// Додавання продукту (лише для продавців)
router.post("/products", authenticate, (req, res) => {
  const { product_name, price, description, image_url, category_id } = req.body;

  if (req.user.role !== "seller") {
    return res.status(403).json({ error: "Доступ лише для продавців" });
  }

  const query =
    "INSERT INTO products (product_name, price, description, image_url, category_id, seller_id) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [product_name, price, description, image_url, category_id, req.user.id],
    (err, results) => {
      if (err) {
        console.error("Помилка додавання продукту:", err);
        return res.status(500).send("Помилка додавання продукту");
      }
      res.status(201).json({ message: "Продукт успішно додано", productId: results.insertId });
    }
  );
});

export default router;




