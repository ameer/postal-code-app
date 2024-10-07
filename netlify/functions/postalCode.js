require('dotenv').config();
const axios = require('axios');

exports.handler = async (event, context) => {
    const { postalCode } = JSON.parse(event.body);
    try {
        const response = await axios.post(process.env.PRIVATE_API_URL, {
            channel: "eShop",
            postal_code: postalCode
        });
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred' })
        };
    }
};
