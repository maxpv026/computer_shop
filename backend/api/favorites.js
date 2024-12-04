// /api/favorites.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// Отримання обраних товарів
router.get("/favorites", (req, res) => {
  const query = "SELECT * FROM favorites";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching favorites" });
    }
    res.json(results);
  });
});

// Додавання товару до обраного
router.post("/favorites", (req, res) => {
  const { productId } = req.body;
  const query = "INSERT INTO favorites (product_id) VALUES (?)";
  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error adding to favorites" });
    }
    res.status(201).json({ message: "Added to favorites" });
  });
});

export default router;
