const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./models/db'); 
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const expertSystem = async (restrictions, allergens) => {
    let query = `
        SELECT DISTINCT dishes.id, dishes.name, dishes.description, dishes.image_url, 
               dishes.energy, dishes.protein, dishes.total_fat, dishes.carbs, dishes.total_sugar
        FROM dishes
        LEFT JOIN tags ON dishes.id = tags.dish_id
        WHERE 1=1
    `;

    let queryValues = [];

    if (restrictions.includes('Weight Gain')) {
        query += ` AND dishes.energy >= 500 AND dishes.protein >= 10 AND (dishes.total_fat >= 10 OR dishes.carbs >= 40)`;
    } else if (restrictions.includes('Weight Loss')) {
        query += ` AND dishes.energy <= 300 AND dishes.total_fat <= 10 AND dishes.total_sugar <= 5`;
    }

    if (allergens.length > 0) {
        query += ` AND tags.tag_name NOT IN (${allergens.map(() => '?').join(', ')})`;
        queryValues.push(...allergens);
    }
    

    const [rows] = await pool.query(query, queryValues);
    return rows;
};

app.post('/api/dishes/recommend', async (req, res) => {
    const { restrictions, allergens } = req.body;

    try {
        const recommendedDishes = await expertSystem(restrictions, allergens);
        res.json(recommendedDishes);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching recommendations.' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
