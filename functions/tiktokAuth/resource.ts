import { defineFunction } from '@aws-amplify/backend';

export const tiktokAuth = defineFunction({
  name: 'tiktokAuth',
  entry: './handler.ts'
});