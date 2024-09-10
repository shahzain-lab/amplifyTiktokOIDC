import { defineFunction } from '@aws-amplify/backend';

export const tiktokGetToken = defineFunction({
  name: 'tiktokGetToken',
  entry: './handler.ts'
});