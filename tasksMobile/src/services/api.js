import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://192.168.100.5:3333',
    baseURL: 'https://tasks-tex.herokuapp.com'
});

export default api;