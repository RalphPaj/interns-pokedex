export const config = {
  port: 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  pagination: {
    defaultLimit: 20
  },
  pokeapi: {
    baseUrl: 'https://pokeapi.co/api/v2'
  }
};