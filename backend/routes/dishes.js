const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Fetch all dishes (for debugging or general listing)
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM dishes');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch dishes', details: err.message });
    }
});

// Fetch recommended dishes based on preferences and allergies
router.post('/recommend', async (req, res) => {
    const { preferences, allergies } = req.body;

    // Validate input
    if (!Array.isArray(preferences) || !Array.isArray(allergies)) {
        return res.status(400).json({ error: 'Preferences and allergies must be arrays.' });
    }

    try {
        // Build the query for recommendations
        const query = `
            SELECT d.*, COUNT(t.tag_name) AS tag_count
            FROM dishes d
            LEFT JOIN ingredients i ON d.id = i.dish_id
            LEFT JOIN tags t ON d.id = t.dish_id
            WHERE (i.ingredient_name NOT IN (?) OR i.ingredient_name IS NULL)
            AND (t.tag_name IN (?) OR t.tag_name IS NULL)
            GROUP BY d.id
            ORDER BY tag_count DESC, d.name ASC; -- Prioritize dishes with more matching tags
        `;

        const [rows] = await db.query(query, [
            allergies.length ? allergies : [null], // Exclude dishes with ingredients matching allergies
            preferences.length ? preferences : [null] // Include dishes with tags matching preferences
        ]);

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch recommended dishes', details: err.message });
    }
});

module.exports = router;