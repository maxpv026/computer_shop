import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/manufacturers", (req, res) => {
  const query = "SELECT DISTINCT manufacturer FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching manufacturers" });
    }
    res.json(results.map((row) => row.manufacturer));
  });
});

export default router;



