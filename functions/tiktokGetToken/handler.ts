import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import * as AWS from 'aws-sdk';

const CLIENT_ID = process.env.TIKTOK_CLIENT_ID!;
const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;
const TOKEN_URL = 'https://open.tiktokapis.com/v2/oauth/token/';

const USER_POOL_ID = process.env.USER_POOL_ID!;
const cognito = new AWS.CognitoIdentityServiceProvider();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const code = event.queryStringParameters?.code;
        if (!code) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Authorization code missing from request.' }),
            };
        }

        const tokenResponse = await axios.post(TOKEN_URL, {
            client_key: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: REDIRECT_URI,
        });

        const { data } = tokenResponse;
        if (data.message !== 'success') {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Failed to exchange authorization code for tokens.' }),
            };
        }

        const { access_token, open_id } = data.data;

        await createUserInCognito(open_id);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User successfully created.', open_id }),
        };

    } catch (error) {
        console.error('Error handling TikTok callback:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};

const createUserInCognito = async (open_id: string) => {
    const params = {
        UserPoolId: USER_POOL_ID,
        Username: open_id,
        UserAttributes: [
            {
                Name: 'custom:tiktok_open_id', 
                Value: open_id,
            },
        ]
    };

    try {
        await cognito.adminCreateUser(params).promise();
        console.log(`User with open_id ${open_id} created in Cognito.`);
    } catch (error: any) {
        if (error.code === 'UsernameExistsException') {
            console.log(`User with open_id ${open_id} already exists in Cognito.`);
        } else {
            throw error;
        }
    }
};
