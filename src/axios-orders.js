import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactfullcourse.firebaseio.com/'
});

export default instance;
