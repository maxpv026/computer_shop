const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (user.length === 0 || !(await bcrypt.compare(password, user[0].password))) {
            return res.status(401).json({ error: 'Неправильний логін або пароль' });
        }

        const token = jwt.sign({ id: user[0].id, role: user[0].role }, 'secret_key', {
            expiresIn: '1h'
        });

        res.json({ token, role: user[0].role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Помилка входу' });
    }
});

  