import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api-studio-moreiras.herokuapp.com/'
    // baseURL: 'http://localhost:5000/'
})


api.interceptors.response.use(
    response => {
        return response
    },
    error => {
        const { response } = error

        if (response && response.status === 401) {
            localStorage.clear()
            window.location.replace("/");
        }
        return Promise.reject(error)
    }
)