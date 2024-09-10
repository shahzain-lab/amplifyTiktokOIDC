import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const CLIENT_ID = 'YOUR_TIKTOK_CLIENT_ID';
const REDIRECT_URI = 'https://your-app-url.com/callback';
const AUTH_URL = 'https://www.tiktok.com/v2/auth/authorize/';
const ISSUER_URL = 'https://www.tiktok.com/v2/auth/authorize/?client_key=sbaweyqrp8faue6kau&response_type=code&scope=user.info.basic&redirect_uri=http://localhost:3000&state=823473892472389';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // const authUrl = `${AUTH_URL}?client_key=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=user.info.basic`;
        const authUrl = ISSUER_URL;

        return {
            statusCode: 302,
            headers: {
                Location: authUrl,
            },
            body: '',
        };
    } catch (error) {
        console.error('Error generating TikTok auth URL:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
