const express = require('express');
const dotenv = require('dotenv');
const { getTikTokVideo } = require('./tiktokAPI');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to validate API key
const validateApiKey = (req, res, next) => {
    const apiKey = req.query.api_key; // Extract API key from query parameters
    if (apiKey !== process.env.API_KEY) { // Compare with the key in the .env file
        return res.status(403).json({ error: 'Invalid API key' }); // Return error if they don't match
    }
    next(); // Proceed to the next middleware/route if API key is valid
};

// Route to handle the download request
app.get('/download', validateApiKey, async (req, res) => {
    const contentUrl = req.query.url;
    if (!contentUrl) {
        return res.status(400).json({ error: 'No URL provided' });
    }

    try {
        const videoData = await getTikTokVideo(contentUrl);
        res.json(videoData); // Return the video and image URLs
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch content' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
