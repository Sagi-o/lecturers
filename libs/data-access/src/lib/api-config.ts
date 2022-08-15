import axios from 'axios'

// In real-world scenario it should be an environment variable like: process.env.BASE_SERVER_URL
const BASE_SERVER_URL = 'http://localhost:3333/api'

export const api = axios.create({
    baseURL: BASE_SERVER_URL,
});