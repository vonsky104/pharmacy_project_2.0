import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://sports-friend-finder-3953b.firebaseio.com/' // -< dev
    // baseURL: 'https://sportowegowno.eu/' // -> prod
});

export { axiosInstance };
