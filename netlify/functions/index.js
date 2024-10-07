require('dotenv').config();
const express = require('express');
const axios = require('axios');
const serverless = require('serverless-http');
const app = express();

app.use(express.json());

app.post('/api/postal-code', async (req, res) => {
    const { postalCode } = req.body;
    try {
        const response = await axios.post(process.env.PRIVATE_API_URL, {
            channel: "eShop",
            postal_code: postalCode
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports.handler = serverless(app);
