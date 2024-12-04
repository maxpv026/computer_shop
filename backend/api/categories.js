import express from "express";
import db from "../db.js";

const router = express.Router();

// Маршрут для отримання категорій
router.get("/categories", (req, res) => {
  const query = "SELECT DISTINCT category_id FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).send("Error fetching categories");
    }
    const categories = results.map((row) => row.category_id);
    res.status(200).json(categories);
  });
});

export default router;



