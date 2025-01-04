import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://gamequests.ru',
});

export default instance;
