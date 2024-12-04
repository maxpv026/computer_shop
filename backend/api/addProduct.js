router.post('/products', authenticate, async (req, res) => {
    if (req.user.role !== 'seller') {
        return res.status(403).json({ error: 'Доступ лише для продавців' });
    }

    const { product_name, price, description, image_url } = req.body;

    try {
        await db.query(
            'INSERT INTO products (product_name, price, description, image_url, seller_id) VALUES (?, ?, ?, ?, ?)',
            [product_name, price, description, image_url, req.user.id]
        );
        res.status(201).json({ message: 'Товар додано' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Помилка додавання товару' });
    }
});
