import axios from 'axios';

export const Api = axios.create({ 
  baseURL: 'https://pro-api.coinmarketcap.com/', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-CMC_PRO_API_KEY': '3f38888c-4423-4371-ab72-72e009a460ed',
  },
});  