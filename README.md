Computer Shop
Computer Shop is a web application for purchasing computer equipment online. Users can browse a product catalog, search for items, add products to the cart, compare products, and save favorite items. Sellers can add new products to the catalog.

Features
Global search for products from any page.
Product catalog with sorting and filtering options.
Shopping cart with add, remove, and checkout functionality(delivering purchase info to email).
Compare up to two products simultaneously.
Save favorite products.
Users can browse the catalog, add products to the cart, and view their order history and saved items.
Technologies
Frontend:
React: for building user interface components.
Axios: for making HTTP requests.
React Router: for routing.
CSS: for styling in a black-and-orange color scheme.
Backend:
Node.js: server-side platform.
Express.js: web framework for building the API.
MySQL: database for storing user and product data.
Nodemailer: for sending email notifications.
System Requirements
Node.js (version 16.0 or later)
MySQL (version 8.0 or later)
Modern web browser
Installation Instructions
Clone the repository:

bash
git clone https://github.com/maxpv026/computer_shop.git
cd computer-shop
Set up the backend:

bash
cd backend
npm install
Create the MySQL database: Execute the following SQL script to create the required tables:

sql

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    category_id INT,
    seller_id INT,
    FOREIGN KEY (seller_id) REFERENCES users(id)
);
Start the server:

bash
node server.js
Set up the frontend:

bash
cd ../frontend
npm install
Start the frontend application:

bash
npm start











# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh





