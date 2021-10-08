import axios from 'axios'

export const api = axios.create({
    // baseURL: 'https://api-studio-moreiras.herokuapp.com/'
    baseURL: 'http://localhost:5000/'
})