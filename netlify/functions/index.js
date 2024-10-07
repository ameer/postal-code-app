require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const serverless = require('serverless-http');
const port = process.env.PORT || 3000;

app.use(express.json());
// Return index.html
app.use(express.static(path.join(__dirname, 'public')));
app.post('/api/postal-code', async (req, res) => {
    const { postalCode } = req.body;
    try {
        const response = await axios.post(process.env.PRIVATE_API_URL,  {
            channel: "eShop",
            postal_code: postalCode
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred', message: error.message, meta: process.env.PRIVATE_API_URL });
    }
});

module.exports.handler = serverless(app);
