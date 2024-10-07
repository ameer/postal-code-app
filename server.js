require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// Return index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
