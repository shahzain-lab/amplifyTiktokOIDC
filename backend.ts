import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { tiktokAuth } from './functions/tiktokAuth/resource';
import { tiktokGetToken } from './functions/tiktokGetToken/resource';
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  data,
  tiktokAuth,
  tiktokGetToken
});
