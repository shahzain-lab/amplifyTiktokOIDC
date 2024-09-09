import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      oidc: [
        {
          name: 'Tiktok5',
          clientId: secret('TIKTOK_CLIENT_ID'),
          clientSecret: secret('TIKTOK_CLIENT_SECRET'),
          scopes: ['openid'],
          endpoints: {
            authorization: 'https://www.tiktok.com/v2/auth/authorize/',
            token: 'https://open.tiktokapis.com/v2/oauth/token/',
            userInfo: 'https://open.tiktokapis.com/v2/user/info/',
            jwksUri: 'https://open.tiktokapis.com/v2/user/info/',
          },
          issuerUrl: 'https://www.tiktok.com/v2/auth/authorize/client_key=sbaweyqrp8faue6kau&response_type=code&scope=user.info.basic&redirect_uri=http://localhost:3000&state=823473892472389',
        },
      ],
      logoutUrls: ['http://localhost:3000/'],
      callbackUrls: [
        'http://localhost:3000/',
      ],
    }
  },
});
