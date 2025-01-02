const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Add a new user
router.post('/add', async (req, res) => {
    const { name, email, preferences, allergies } = req.body;

    // Validate input
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    try {
        // Check if the user already exists
        const existingUserQuery = 'SELECT * FROM users WHERE email = ?';
        const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUsers.length > 0) {
            return res.status(409).json({ error: 'User  with this email already exists.' });
        }

        const query = `
            INSERT INTO users (name, email, preferences, allergies)
            VALUES (?, ?, ?, ?)
        `;
        await db.query(query, [name, email, JSON.stringify(preferences), JSON.stringify(allergies)]);
        res.json({ message: 'User  added successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add user', details: err.message });
    }
});

// Get user preferences and allergies by email
router.get('/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const query = `
            SELECT preferences, allergies
            FROM users
            WHERE email = ?
        `;
        const [rows] = await db.query(query, [email]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User  not found' });
        }

        const user = rows[0];
        res.json({
            preferences: JSON.parse(user.preferences),
            allergies: JSON.parse(user.allergies),
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user preferences', details: err.message });
    }
});

module.exports = router;