const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const SERP_API_KEY = process.env.SERP_API_KEY;

// middleware to parse JSON request body and enable CORS
app.use(express.json());
app.use(cors());

// route handler function
const searchHandler = async (req, res) => {
    const { query } = req.body;
    // empty query check
    if ( !query || query.trim() === '') return res.status(400).json({ error: 'Query cannot be empty' });

    // query length check
    if (query.length > 1000) return res.status(400).json({ error: 'Query is too long' });

    try {
        // fetch search results from Google using SerpApi
        const response = await axios.get('https://serpapi.com/search', {
            params: {
                q: query,
                api_key: SERP_API_KEY,
                engine: 'google',
                gl: 'cz',
                hl: 'cz'
            }
        });

        if(response.data.error) {
            return res.status(500).json({ error: response.data.error });
        }

        // extract relevant fields from search results
        const results = response.data.organic_results.map(r => ({
            title: r.title,
            link: r.link,
            snippet: r.snippet
        }));

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch search results' });
    }
};

// route to search for query on Google
app.post('/search', searchHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, searchHandler };