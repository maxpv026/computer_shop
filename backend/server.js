import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productsRoutes from "./api/products.js";
import nodemailer from "nodemailer";

const app = express();
const PORT = 5003;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Підключення маршрутів для продуктів
app.use("/api", productsRoutes);

// Маршрут для надсилання email
app.post("/api/send-email", async (req, res) => {
  const { subject, body } = req.body;

  // Налаштування Nodemailer для Ethereal
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email", // SMTP-сервер Ethereal
    port: 587,                   // Порт для з'єднання
    auth: {
      user: "landen46@ethereal.email", // Ваш Ethereal username
      pass: "bMKzm8rjvf9FSYPWz5",     // Ваш Ethereal password
    },
  });

  try {
    // Відправка email
    const info = await transporter.sendMail({
      from: '"Магазин" <noreply@shop.com>', // Від кого
      to: "maxym94000@gmail.com",           // Куди надсилати лист
      subject,                             // Тема листа
      html: body,                          // Тіло листа у форматі HTML
    });

    console.log("Email надіслано:", nodemailer.getTestMessageUrl(info)); // URL для перегляду листа
    res.status(200).send("Email успішно надіслано!");
  } catch (error) {
    console.error("Помилка надсилання email:", error);
    res.status(500).send("Не вдалося надіслати email.");
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
