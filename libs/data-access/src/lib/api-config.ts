import axios from 'axios'

// In production it should be and environment variable like: process.env.BASE_SERVER_URL
const BASE_SERVER_URL = 'https://localhost:3333/api'

export const api = axios.create({
    baseURL: BASE_SERVER_URL,
});