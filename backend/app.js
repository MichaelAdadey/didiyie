const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./models/db'); // Importing the MySQL pool from db.js
const cors = require('cors'); // Importing CORS package

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Expert System Logic for Meal Recommendation
const expertSystem = async (restrictions, cuisines, allergens) => {
    let recommendedDishes = [];
  
    // Step 1: Initial Dishes Query
    let query = `
      SELECT DISTINCT dishes.id, dishes.name, dishes.cuisine, dishes.description, dishes.image_url
      FROM dishes
      LEFT JOIN tags ON dishes.id = tags.dish_id
      WHERE 1=1
    `;
  
    let queryValues = [];
  
    // Step 2: Apply Dietary Restrictions
    if (restrictions.length > 0) {
        query += ` AND tags.tag_name IN (${restrictions.map(() => '?').join(', ')}) 
                   AND tags.type = 'preference'`;
        queryValues = [...queryValues, ...restrictions];
    }
  
    // Step 3: Apply Cuisines
    if (cuisines.length > 0) {
        query += ` AND dishes.cuisine IN (${cuisines.map(() => '?').join(', ')})`;
        queryValues = [...queryValues, ...cuisines];
    }
  
    // Step 4: Apply Allergens
    if (allergens.length > 0) {
        query += ` AND tags.tag_name NOT IN (${allergens.map(() => '?').join(', ')}) 
                   AND tags.type = 'allergen'`;
        queryValues = [...queryValues, ...allergens];
    }
  
    // Step 5: Query Execution
    const [rows] = await pool.query(query, queryValues); // Using the connection pool here
    console.log("Query:", query);
    console.log("Values:", queryValues);
  
    // Step 6: Apply Expert System Rules for Further Filtering
  
    // Example Rule 1: If 'Vegan' is selected, remove any dish that contains dairy
    if (restrictions.includes('Vegan')) {
        recommendedDishes = rows.filter(dish => !dish.description.includes('dairy'));
    } else {
        recommendedDishes = rows;
    }
  
    // Example Rule 2: If 'Gluten-Free' is selected, remove dishes containing wheat or gluten
    if (restrictions.includes('Gluten-Free')) {
        recommendedDishes = recommendedDishes.filter(dish => !dish.description.includes('wheat'));
    }
  
    // Example Rule 3: Apply cuisine preferences more strictly (e.g., don't show dishes from non-preferred cuisines)
    if (cuisines.length > 0) {
        recommendedDishes = recommendedDishes.filter(dish => cuisines.includes(dish.cuisine));
    }
  
    return recommendedDishes;
};
  
// API endpoint for recommending dishes
app.post('/api/dishes/recommend', async (req, res) => {
    const { restrictions, cuisines, allergens } = req.body;

    try {
        const recommendedDishes = await expertSystem(restrictions, cuisines, allergens);
        res.json(recommendedDishes); // Ensure dishes are returned in the format expected by the front-end
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'An error occurred while fetching recommendations.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
