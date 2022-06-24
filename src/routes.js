const { Router } = require('express');
const axios = require('axios');

const createClient = require('./redisclient');

const routes = Router();
const apiUrl = 'https://rickandmortyapi.com/api/character/';
const redisClient = createClient({
    host: '127.0.0.1',
    port: 6379,
})();

(async () => {
    await redisClient.connection();
})();

// Get all characteres
routes.get('/character', async (req, res) => {
    try {
        const character = await redisClient.getItem('all');
        if (character) {
            return res.json(JSON.parse(character));
        }

        const response = await axios.get(apiUrl);

        const saveResult = await redisClient.setItem('all', JSON.stringify(response.data));

        console.log('save all items result', saveResult);
        
        return res.json({ character: response.data });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// Get a single character
routes.get('/character/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const character = await redisClient.getItem(id);
        if (character) {
            return res.json(JSON.parse(character));
        }

        const response = await axios.get(`${apiUrl}${id}`);

        const saveResult = await redisClient.setItem(id, JSON.stringify(response.data));

        console.log(`save ${id} result`, saveResult);
        
        return res.json({ character: response.data });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// Get all characters ids
routes.get('/character/all', async (req, res) => {
    try {
        const { values } = req.query;

        const data = await redisClient.getKeys(values);
        if (data) {
            return res.send(JSON.parse(data));
        }

        return res.send('The cache is empty');
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// Reset cache data
routes.delete('/character', async (req, res) => {
    try {
        const result = await redisClient.restore();

        return res.json(result);
    } catch (error) {
        return res.status(500).send(error.message);        
    }
});

// Remove a character data
routes.delete('/character/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await redisClient.deleteKey(id);

        return res.json(result);
    } catch (error) {
        return res.status(500).send(error.message);        
    }
});

module.exports = routes;