const { getTikTokVideo } = require('../tiktokAPI');
const dotenv = require('dotenv');

dotenv.config();

exports.handler = async (event) => {
    // Check API Key
    const params = new URLSearchParams(event.queryStringParameters);
    const apiKey = params.get('api_key');
    const contentUrl = params.get('url');

    if (apiKey !== process.env.API_KEY) {
        return {
            statusCode: 403,
            body: JSON.stringify({ error: 'Invalid API key' }),
        };
    }

    if (!contentUrl) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'No URL provided' }),
        };
    }

    try {
        const videoData = await getTikTokVideo(contentUrl);
        return {
            statusCode: 200,
            body: JSON.stringify(videoData),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch content' }),
        };
    }
};
